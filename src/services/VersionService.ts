import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { APP_DOWNLOAD, APK_DOWNLOAD } from "./Constants";
import { AppService, AppGlobal } from './../app/app.service';

@Injectable()
export class VersionService {
    version: string;
    currentVersion: string;

    constructor(private platform: Platform,
        private alertCtrl: AlertController,
        private transfer: FileTransfer,
        private appVersion: AppVersion,
        private file: File,
        private fileOpener: FileOpener,
        private inAppBrowser: InAppBrowser,
        private appService: AppService) {
    }
    /**
     * 检查app是否需要升级
     */
    detectionUpgrade() {
        var _that = this;
        this.appService.httpGet(AppGlobal.API.getVersion, null, rs => {
            _that.version = rs;
            _that.getVersionNumber().then(function () {
                if (_that.currentVersion != null && _that.version > _that.currentVersion) {
                    _that.alertCtrlMethod();
                }
                else {
                    _that.appService.toast('已是最新版本');
                }
            });
        });

    }
    alertCtrlMethod() {
        this.alertCtrl.create({
            title: '升级',
            subTitle: '发现新版本,是否立即升级？',
            buttons: [{ text: '取消' },
            {
                text: '确定',
                handler: () => {
                    this.downloadApp();
                }
            }
            ]
        }).present();
    }
    /**
     * 下载安装app
     */
    downloadApp() {
        if (true) {
            let alert = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
                buttons: ['后台下载']
            });
            alert.present();
            const fileTransfer: FileTransferObject = this.transfer.create();
            const apk = this.file.externalRootDirectory + 'mesnac.apk';
            fileTransfer.download(APK_DOWNLOAD, apk).then(() => {
                this.fileOpener.open(apk, 'application/vnd.android.package-archive');
            });
            fileTransfer.onProgress((event: ProgressEvent) => {
                let num = Math.floor(event.loaded / event.total * 100);
                if (num === 100) {
                    alert.dismiss();
                } else {
                    let title = document.getElementsByClassName('alert-title')[0];
                    title && (title.innerHTML = '下载进度：' + num + '%');
                }
            });
        }
    }
    /**
       * 获得app版本号,如0.01
       * @description  对应/config.xml中version的值
       * @returns {Promise<string>}
       */
    getVersionNumber(): Promise<string> {
        return new Promise((resolve) => {
            this.appVersion.getVersionNumber().then((value: string) => {
                this.currentVersion = value;
                resolve(value);
            }).catch(err => {
                console.log('getVersionNumber:' + err);
            });
        });
    }
}


