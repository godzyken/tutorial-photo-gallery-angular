import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
let Tab2Page = class Tab2Page {
    constructor(photoService, actionSheetController) {
        this.photoService = photoService;
        this.actionSheetController = actionSheetController;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.photoService.loadSaved();
        });
    }
    showActionSheet(photo, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Photos',
                buttons: [{
                        text: 'Delete',
                        role: 'destructive',
                        icon: 'trash',
                        handler: () => {
                            this.photoService.deletePicture(photo, position);
                        }
                    }, {
                        text: 'Cancel',
                        icon: 'close',
                        role: 'cancel',
                        handler: () => {
                            // Nothing to do, action sheet is automatically closed
                        }
                    }]
            });
            yield actionSheet.present();
        });
    }
};
Tab2Page = __decorate([
    Component({
        selector: 'app-tab2',
        templateUrl: 'tab2.page.html',
        styleUrls: ['tab2.page.scss']
    }),
    __metadata("design:paramtypes", [PhotoService, ActionSheetController])
], Tab2Page);
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map