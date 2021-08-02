import {Component,ViewChild} from '@angular/core';
import {Platform,Tabs,NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SettingPage} from "../setting/setting";
import {BackButtonService} from "../../services/backButton.service";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];
  @ViewChild('myTabs') tabRef: Tabs;
  public loginParams: any;
  constructor(public params: NavParams, public backButtonService: BackButtonService,
    private platform: Platform) {
    this.loginParams = params;
    this.tabRoots = [{
        root: HomePage,
        tabTitle: '主页',
        tabIcon: 'home'
      },
      {
        root: SettingPage,
        tabTitle: '我',
        tabIcon: 'person'
      }
    ];

    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabRef);
    });
  }
}
