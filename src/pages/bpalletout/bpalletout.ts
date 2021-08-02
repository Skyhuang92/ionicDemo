import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppService,AppGlobal} from './../../app/app.service';

/**
 * Generated class for the BpalletoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bpalletout',
  templateUrl: 'bpalletout.html',
})
export class BpalletoutPage {
  @ViewChild('locNo') input;
  locNo : string;
  taskNo : any;
  palletNo : any;
  binNo : any;
  public bin_No: string;
  public store: string;
  public userName:string;
  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.store = navParams.get('store');
    this.userName = navParams.get('userName');
  }
  //站台条码input录入
  focusInputp(locNo: HTMLInputElement) {
    if (locNo.value.length == 0) {
      this.appService.toast('请扫描站台编号');
    } else {
      this.locNo = locNo.value;
    }
   //this.input.nativeElement.select();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BpalletoutPage');
  }

  //入库按键触发
  bpalletOutButtonClick(locNo: HTMLInputElement){   
    if(this.locNo != 'A1103' && this.locNo != 'B1116'){
      this.appService.toast('请输入正确站台号');
    }
    else{
      this.enableIntoWare(locNo);
    }
  }
  //创建出库订单，并获取生成的任务号
  enableIntoWare(locNo: HTMLInputElement) {
    var params = {};
    params = {
      PalletNumber: this.palletNo,
      StoreNo: this.store,
      UserName: this.userName,
      ElocNo :locNo.value
    };
    this.appService.httpPost(AppGlobal.API.getBpalletOut,
      params,
      rs => {
        if (rs == '[]') {
          this.appService.toast('创建出库单失败');
        }  else if(rs.TaskNo == '未生成任务'){
           this.appService.toast('订单生成任务失败');
        } 
        else{
          this.taskNo = rs.TaskNo;
          this.palletNo = rs.PalletNo;
          this.binNo = rs.BinNo;
        }
      });
  }
  //清空界面
  clearButtonClick(locNo: HTMLInputElement) {
    var _that = this;
    this.appService.alertConfirm('确定清空界面内容吗？', function () {
      _that.locNo = null;
      _that.taskNo = null;
      _that.palletNo = null;
      locNo.value = null;
    });

  }
}
