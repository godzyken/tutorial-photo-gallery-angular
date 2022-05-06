import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Clipboard } from '@capacitor/clipboard';
import { ActionSheet, ActionSheetButtonStyle, ShowActionsOptions } from '@capacitor/action-sheet';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  myText = 'My first Electron test';

  constructor(private electronService: ElectronService) {
    if (this.electronService.isElectronApp) {
      console.log('I AM ELECTRON');
      this.electronService.ipcRenderer.on('trigger-alert', this.showElectronAlert);
    }
  }

  async showElectronAlert() {
    const options: ShowActionsOptions = {
      title: 'Electron Hello!',
      message: 'I am from your menu :)',
      options: [
        {
          title: 'OK',
          style: ActionSheetButtonStyle.Destructive,
          icon: 'ionitron'
        }
      ]
    };
    const result = await ActionSheet.showActions(options);

    console.log('Action Sheet result:', result);
    await this.electronService.remote();
  }

  async scheduleNotification() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Electron Test Notification',
          body: 'Notification content',
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 5)
          },
          sound: null,
          actionTypeId: '',
          attachments: null,
          extra: null
        }
      ]
    });
  }

  async copyText() {
    Clipboard.write({
      string: this.myText
    });

    ActionSheet.showActions({
      title:'Ok',
      message: 'Text is in the clipboard.',
      options: [
        { 
          title: 'Ok',
          style: ActionSheetButtonStyle.Default
        }
      ]
    });
  }


}
