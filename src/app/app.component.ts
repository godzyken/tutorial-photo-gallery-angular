import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private _electronService: ElectronService) {
    this.initializeApp();
  }

  initializeApp(): void {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();
    if (this._electronService.isElectronApp) {
      let pong: string = this._electronService
      .ipcRenderer
      .sendSync('ping');
      console.log(pong);
    }
  }
}
