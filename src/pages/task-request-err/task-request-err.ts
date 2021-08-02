import { Component } from '@angular/core';
import {AppService,AppGlobal} from './../../app/app.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewChild} from '@angular/core';

/**
 * Generated class for the TaskRequestErrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-request-err',
  templateUrl: 'task-request-err.html',
})
export class TaskRequestErrPage {
  @ViewChild('locNO') input;
  palletNO : string;
  locNO : string;
  errDesc : string;
  public store: string;
  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.store = navParams.get('store');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskRequestErrPage');
  }

   //输入条码信息并查询托盘信息
   palletInputp(palletNo: HTMLInputElement) {
    if (palletNo.value.length == 0) {
      this.appService.toast('请扫描托盘条码');
    }
    else {
      this.palletNO = palletNo.value;
    }  
  }
     //输入托盘信息并查询托盘信息
     locInputp(locNo: HTMLInputElement) {
      if (locNo.value.length == 0) {
        this.appService.toast('请扫描托盘条码');
      }
      else {
        this.locNO = locNo.value;
        this.queryerr();
      }  
    }

  //查询托盘信息
  queryerr() {
    var params = {};
    params = {
      PalletNo: this.palletNO,
      StoreNo: this.store,
      locNo: this.locNO
      
    };
    this.appService.httpPost(AppGlobal.API.TaskRequesterr, params, rs => {
      if (rs == "[]") {
        this.appService.toast('数据库执行出错');
       }else {
          this.palletNO = rs.PalletNo;
          this.locNO = rs.LocNo;
          this.errDesc = rs.ErrDesc;
        }
      });
  }

    
    //清空界面
    emptypallet(palletNo: HTMLInputElement, locNo: HTMLInputElement) {
        this.palletNO = null;
        this.locNO = null;
        this.errDesc= null;
        palletNo.value = null;
        locNo.value = null;
  }
  }