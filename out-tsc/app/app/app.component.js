import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
let AppComponent = class AppComponent {
    constructor() {
        this.initializeApp();
    }
    initializeApp() {
        /* To make sure we provide the fastest app loading experience
           for our users, hide the splash screen automatically
           when the app is ready to be used:
    
            https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
        */
        SplashScreen.hide();
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss']
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map