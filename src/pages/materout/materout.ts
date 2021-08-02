import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppService,AppGlobal} from './../../app/app.service';

/**
 * Generated class for the MaterOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materout',
  templateUrl: 'materout.html',
})
export class MaterOutPage {

  UserName:string;

  //区域名称列表
  locAreaNameArr: string[];

  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.UserName = navParams.get('userNamePar');
    
  }
 
  //选择列表赋值 查询加载区域类型列表
  queryLocAreaList() {
    this.appService.httpPost(AppGlobal.API.QueryBackLocArea, null, rs => {
      this.locAreaNameArr = [];   

      //物料类型列表赋值
      for (let i in rs) {
        //this.materTypeNoArr.push(rs.materTypeArr[i][0]);
        var str = rs[i].toString();
        this.locAreaNameArr.push(str);
      }
    });
  }

  //余料回库
  materBack(locNo: HTMLInputElement,palletNo: HTMLInputElement,materNo: HTMLInputElement,materQty: HTMLInputElement)
  {
    if(locNo == null || locNo.value.toString() == "")
    {
      this.appService.toast('未录入工位编号！');
      return;
    }
    if(palletNo == null || palletNo.value.toString() == "")
    {
      this.appService.toast('未录入托盘编号！');
      return;
    }
    if(materNo == null || materNo.value.toString() == "")
    {
      this.appService.toast('未录入余料类型！');
      return;
    }
    if(materQty == null || materQty.value.toString() == "")
    {
      this.appService.toast('未录入余料数量！');
      return;
    }

    var params = {};
    params = {
      MaterNo:materNo.value.toString(),
      LocNo:locNo.value.toString(),    
      PalletNo: palletNo.value.toString(),
      ProductQty:materQty.value.toString(),
      UserName:this.UserName
    };

    this.appService.httpPost(AppGlobal.API.ResidueMaterBack, params, rs => {

      if (rs == "[]") {
        this.appService.toast('数据库执行出错');
      } else {
        this.appService.toast(rs);
      }
    });
  }


}
