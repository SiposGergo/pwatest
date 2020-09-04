import { Component, HostListener } from '@angular/core';
import { UpdateService } from './services/update.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  promptEvent;

  private readonly VAPID_PUBLIC_KEY =
    'BD4IyvGaW4ZqYUa1SOErtQiqcfaKBIoTMV3fwawhMzLwAlydvyzM_aWo4zW7Wb-zvy9xAA7lBPxvVQzDOXjufkc';

  // A2HS
  @HostListener('window:beforeinstallprompt', ['$event']) _promptEvent(event) {
    console.log('beforeinstallprompt fired: ', event);
    this.promptEvent = event;
  }

  constructor(
    private _update: UpdateService,
    private _swPush: SwPush
  ) {}

  installPwa() {
    this.promptEvent.prompt();
  }

  subscribe() {
    this._swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((x) =>
        console.log('Push subscription: ', JSON.stringify(x.toJSON()))
      )
      .catch((err) => console.log('error: ', err));

    // remove consent here: chrome://settings/content/notifications
  }
}
