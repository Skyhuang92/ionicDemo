import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {AppService,AppGlobal} from './../../app/app.service';
import {LoginPage} from '../login/login';

/**
 * Generated class for the StockreturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stockreturn',
  templateUrl: 'stockreturn.html',
})
export class StockreturnPage {
  public login: LoginPage;
  @ViewChild('PalletQty') skipPalletNo;
  ProductNoArray: string[];
  palletNo: string;
  userName:any;
  palletQty: string;

  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.userName = navParams.get('userNamePar');
  }
  //托盘条码input录入
  focusInputp(palletNo:HTMLInputElement){
    if(palletNo.value.length == 0){
      this.appService.toast('请扫描底部托盘号');
    }else{
      this.palletNo = palletNo.value;
      this.skipPalletNo.nativeElement.focus();
      this.skipPalletNo.nativeElement.select();
    } 
  }

  //物料数量input录入
  focusInputi(palletQty: HTMLInputElement) {
    if (palletQty.value.length == 0) {
      this.appService.toast('请输入该垛托盘数量');
    } else {
      this.palletQty = palletQty.value;
    }  
  }
  //物料绑定按钮点击事件
  bounding(palletNo: HTMLInputElement, palletQty: HTMLInputElement) {
    if (this.palletNo == null) {
      this.appService.toast('请扫描底部托盘号');
    } else if (this.palletQty == null) {
      this.appService.toast('请输入该垛托盘数量');
    } else {
      this.enableIntoWare(palletNo, palletQty);
    }
  }
  //新增
  queryerr() {
    var params = {};
    params = {
      palletNo: this.palletNo
    };
    this.appService.httpPost(AppGlobal.API.palletBound, params, rs => {
      if (rs == "[]") {
        this.appService.toast('数据库执行出错');
       }else {
         //该托盘使用情况
        }
      }
    );
  }
  enableIntoWare(palletNo: HTMLInputElement, palletQty: HTMLInputElement) {
    var params = {};
    params = {
      PalletNumber: this.palletNo,
      productQty: this.palletQty,     
      UserName:this.userName
    };
    this.appService.httpPost(AppGlobal.API.stockReturn,
      params,
      rs => {
        if (rs == "物料绑定成功") {
          this.appService.toast('空托盘绑定成功');
          this.issussfull(palletNo, palletQty);
        } else {
          this.appService.alert(rs);
        }
      }
    );
  }
  issussfull(palletNo: HTMLInputElement, productNo: HTMLInputElement) {    
    this.palletNo = null;
    this.palletQty = null;
    palletNo = null;
    productNo = null;
  }
  //清空按钮点击事件
  letEmpty(palletNo: HTMLInputElement, productQty: HTMLInputElement) {
    var _that = this;
    this.appService.alertConfirm('确定清空当前记录？', function () {
      _that.palletNo = null;
      _that.palletQty = null;

      palletNo.value = null;
      productQty.value = null;
    });
  }
}
