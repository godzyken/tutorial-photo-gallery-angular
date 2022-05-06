import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public notificationService: NotificationService,
    public actionSheetController: ActionSheetController
    ) {}
  
  
  async ngOnInit() {
    await this.notificationService.scheduleNotification();
  }

  public async showNotification() {

    const notificationSheet = await this.actionSheetController.create(
      {
        header: 'Electron',
        buttons: [
          {
            text: 'Validate',
            role: 'alert',
            icon: 'trash',
            handler: () => {
              this.notificationService.showElectronAlert();
            }
          }
        ]
      }
    );

    await notificationSheet.present();
  }

}
