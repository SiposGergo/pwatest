import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import {first, switchMap} from 'rxjs/operators';

@Injectable()
export class UpdateService {
  private readonly INSTALL_PERIOD = 10 * 1000;

  constructor(private _appRef: ApplicationRef, private _updates: SwUpdate) {
    if (environment.production && _updates.isEnabled) {
      this.initSwUpdate();
    }
  }

  private initSwUpdate() {
    this._updates.available.subscribe((update) =>
      console.log('Update available:', update)
    );

    this._updates.activated.subscribe((update) =>
      console.log('Update activated', update)
    );

    this._appRef.isStable
      .pipe(
        first((isStable) => isStable === true),
        switchMap(() => interval(this.INSTALL_PERIOD))
      )
      .subscribe(() => this._updates.checkForUpdate());

    this._updates.available.subscribe((event) => {
      console.log('Current version is ', event.current);
      console.log('Available version is ', event.available);
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
