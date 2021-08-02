import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { ValueTransformer } from '../../node_modules/@angular/compiler/src/util';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //首次加载页面为登陆页面 LoginPage
  rootPage:any=LoginPage ;
  pages: Array<{ title: string, component: any }>;
  constructor(public menuCtrl: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage,) {
    this.pages = [
      { title: '主页', component: TabsPage },
    ];
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  openPage(page) {
    this.menuCtrl.close();
    this.nav.setRoot(page.component);
  }
}
