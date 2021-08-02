import {Component} from '@angular/core';
import {IonicPage,ModalController,NavController,NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {VersionService} from '../../services/VersionService';
import {AppService,AppGlobal} from './../../app/app.service';
import {AppVersion} from '@ionic-native/app-version';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})

export class SettingPage {
  myEvent;
   public userInfo:any;
   public userName:any;
  currentVersion;
  constructor(private iab: InAppBrowser, private appVersion: AppVersion, public appService: AppService, public versionService: VersionService, public params: NavParams, private navCtrl: NavController, public modalCtrl: ModalController) {
    this.userInfo = params.data;
    this.getVersionNumber();
  }
  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
  getVersionNumber(): Promise < string > {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        this.currentVersion = value;
        resolve(value);
      }).catch(err => {
        console.log('getVersionNumber:' + err);
      });
    });
  }
  logOut() {
    this.navCtrl.setRoot(LoginPage);
  }
  aboutUs() {
    this.iab.create('http://www.huashine.net/', '_blank', 'location=yes');
  }
  checkUpdate() {
    this.versionService.detectionUpgrade();
  }
}
