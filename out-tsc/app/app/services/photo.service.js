import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
let PhotoService = class PhotoService {
    constructor(platform) {
        this.platform = platform;
        this.photos = [];
        this.PHOTO_STORAGE = 'photos';
        this.convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }
    loadSaved() {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve cached photo array data
            const photoList = yield Storage.get({ key: this.PHOTO_STORAGE });
            this.photos = JSON.parse(photoList.value) || [];
            // If running on the web...
            if (!this.platform.is('hybrid')) {
                // Display the photo by reading into base64 format
                for (let photo of this.photos) {
                    // Read each saved photo's data from the Filesystem
                    const readFile = yield Filesystem.readFile({
                        path: photo.filepath,
                        directory: Directory.Data,
                    });
                    // Web platform only: Load the photo as base64 data
                    photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
                }
            }
        });
    }
    /* Use the device camera to take a photo:
    // https://capacitor.ionicframework.com/docs/apis/camera
  
    // Store the photo data into permanent file storage:
    // https://capacitor.ionicframework.com/docs/apis/filesystem
  
    // Store a reference to all photo filepaths using Storage API:
    // https://capacitor.ionicframework.com/docs/apis/storage
    */
    addNewToGallery() {
        return __awaiter(this, void 0, void 0, function* () {
            // Take a photo
            const capturedPhoto = yield Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100, // highest quality (0 to 100)
            });
            const savedImageFile = yield this.savePicture(capturedPhoto);
            // Add new photo to Photos array
            this.photos.unshift(savedImageFile);
            // Cache all photo data for future retrieval
            Storage.set({
                key: this.PHOTO_STORAGE,
                value: JSON.stringify(this.photos),
            });
        });
    }
    // Save picture to file on device
    savePicture(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert photo to base64 format, required by Filesystem API to save
            const base64Data = yield this.readAsBase64(photo);
            // Write the file to the data directory
            const fileName = new Date().getTime() + '.jpeg';
            const savedFile = yield Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Data,
            });
            if (this.platform.is('hybrid')) {
                // Display the new image by rewriting the 'file://' path to HTTP
                // Details: https://ionicframework.com/docs/building/webview#file-protocol
                return {
                    filepath: savedFile.uri,
                    webviewPath: Capacitor.convertFileSrc(savedFile.uri),
                };
            }
            else {
                // Use webPath to display the new image instead of base64 since it's
                // already loaded into memory
                return {
                    filepath: fileName,
                    webviewPath: photo.webPath,
                };
            }
        });
    }
    // Read camera photo into base64 format based on the platform the app is running on
    readAsBase64(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            // "hybrid" will detect Cordova or Capacitor
            if (this.platform.is('hybrid')) {
                // Read the file into base64 format
                const file = yield Filesystem.readFile({
                    path: photo.path,
                });
                return file.data;
            }
            else {
                // Fetch the photo, read as a blob, then convert to base64 format
                const response = yield fetch(photo.webPath);
                const blob = yield response.blob();
                return (yield this.convertBlobToBase64(blob));
            }
        });
    }
    // Delete picture by removing it from reference data and the filesystem
    deletePicture(photo, position) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove this photo from the Photos reference data array
            this.photos.splice(position, 1);
            // Update photos array cache by overwriting the existing photo array
            Storage.set({
                key: this.PHOTO_STORAGE,
                value: JSON.stringify(this.photos),
            });
            // delete photo file from filesystem
            const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
            yield Filesystem.deleteFile({
                path: filename,
                directory: Directory.Data,
            });
        });
    }
};
PhotoService = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [Platform])
], PhotoService);
export { PhotoService };
//# sourceMappingURL=photo.service.js.map