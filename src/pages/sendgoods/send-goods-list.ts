import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';

@IonicPage()                                                                          
@Component({
  selector:'page-send-goods-list',
  templateUrl:'send-goods-list.html',
})

export class SendGoodsListPage {
  //定义变量
  @ViewChild('palletNo') input;
  sendMaterial:any;
  sendNumber:any;
  userName:any;

  //构造函数
  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.userName = this.navParams.get("userName");
  }
 
  //点击【发货】按钮事件
  sendGoods(palletNo: HTMLInputElement, barcode: HTMLInputElement) {
  if (palletNo.value.length > 0 && barcode.value.length > 0) {
      this.appService.alert('托盘和条码只能存在一个！');
     } 
  else if(palletNo.value.length == 0 && barcode.value.length == 0 ) {
       this.appService.alert('请输入托盘号或者条码号');
    }
  else if ((palletNo.value.length == 0 && barcode.value.length > 0) || (palletNo.value.length > 0 && barcode.value.length == 0)) {
       this.appService.httpPost(AppGlobal.API.sendGoodsForPallet, { Barcode: barcode.value,PalletNo:palletNo.value,UserName:this.userName}, rs => {
         if (rs == "[]") {
           this.appService.alert('数据库抛出异常了！！');
           this.sendMaterial = '数据库抛出异常了！！';
           this.sendNumber = '数据库抛出异常了！！'
          }
         else if (rs[0] != '发货成功') {
           this.appService.alert(rs[0]);
           this.sendMaterial = '发货失败';
           this.sendNumber = '发货失败';
          }
         else {
          this.sendMaterial = rs[1];
          this.sendNumber = rs[2];
          this.appService.toast('发货成功');
         this.reset(palletNo,barcode);  
          }
      });
    } 
  }
  //发货成功，清空界面
  reset(barcode: HTMLInputElement, palletNo: HTMLInputElement)
  {
  this.sendMaterial = null;
  this.sendNumber = null;
  barcode.value = null; 
  palletNo.value = null;
  }
 //点击【清空】按钮事件
 letEmpty(barcode: HTMLInputElement, palletNo: HTMLInputElement) {
  //不可以直接用this，否则报错
  var _that = this;
  this.appService.alertConfirm('确定清空界面内容吗？', function () {     
  _that.sendMaterial = null;
  _that.sendNumber = null;
  barcode.value = null; 
  palletNo.value = null;
  });
}
}
