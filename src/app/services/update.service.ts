import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpdateService {
  constructor(private _appRef: ApplicationRef, private _updates: SwUpdate) {
    if (environment.production) {
      this.initSwUpdate();
    }
  }

  private initSwUpdate() {
    this._appRef.isStable
      .pipe(
        first((isStable) => isStable === true),
        switchMap(() => interval(10 * 1000))
      )
      .subscribe(() => this._updates.checkForUpdate());

    this._updates.available.subscribe((event) => {
      console.log('current version is ', event.current);
      console.log('available version is ', event.available);
      if (
        window.confirm(
          `Old version: ${event.current.appData['version']}, New version: ${event.available.appData['version']}`
        )
      ) {
        window.location.reload();
      }
    });
  }
}
