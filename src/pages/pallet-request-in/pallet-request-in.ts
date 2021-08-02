import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AppService, AppGlobal } from './../../app/app.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-pallet-request-in',
  templateUrl: 'pallet-request-in.html',
})
export class PalletRequestInPage {
  public login: LoginPage;
  
  LocNo: string; //站台编号
  PalletNo: string;
  MaterNo:string;//物料编号
  MaterName: string;  //物料名称
  PalletType: string;
  UserName:string;
  ProductQty:string;//产品/托盘数量
  //物料类型数组
  materType: string;
  materTypeNoArr: string[];
  materTypeNameArr: string[];
  //托盘类型数组
  palletType:string;
  palletTypeNoArr:string[];
  palletTypeNameArr:string[];

  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.UserName = navParams.get('userNamePar');
    this.queryProviderList();
  }

  //托盘类型--空托盘选择联动
  MaterTypeChange(materNo: HTMLInputElement) {
    if (this.materType == "空托盘/垛") {
      this.MaterNo = "BPALLET";     
      materNo.value = "BPALLET";
    }else{
      this.MaterNo = "";     
      materNo.value = "";
    }
  }
 
  //选择列表赋值 查询加载物料类型列表和托盘类型列表
  queryProviderList() {
    this.appService.httpPost(AppGlobal.API.QueryPrepareInfo, null, rs => {
      this.materTypeNoArr = [];
      this.palletTypeNoArr = []; 
      this.materTypeNameArr = [];
      this.palletTypeNameArr = []; 
      
       //物料类型列表赋值
       for (let i in rs.materTypeArr)  {     
        this.materTypeNoArr.push(rs.materTypeArr[i][0]);
        this.materTypeNameArr.push(rs.materTypeArr[i][1]);        
      }
       //托盘类型列表赋值
       for (let i in rs.palletTypeArr)  {            
        this.palletTypeNoArr.push(rs.palletTypeArr[i][0]);
        this.palletTypeNameArr.push(rs.palletTypeArr[i][1]);
      }
    });
  }

  //物料类型名称显示
  OnChange(materNo: HTMLInputElement)
  {
    this.MaterName = "";
    if (materNo == null || materNo.value.toString().length == 0) {
      return;
    }

    //托盘垛不查询
    if (this.materType == "空托盘/垛") {
      this.MaterName = "空托盘/垛";
      return;
    }

    var params = {};
    params = {
      MaterNo: materNo.value.toString()
    };
    this.appService.httpPost(AppGlobal.API.queryMaterName, params, rs => {
      if (rs != "[]") {
        this.MaterNo = rs.MaterNo;
        this.MaterName = rs.MaterName;
        materNo.value = rs.MaterNo;
      }
    });
  }


  //物料绑定按钮点击事件
  bounding(locNo: HTMLInputElement,palletNo: HTMLInputElement, materNo: HTMLInputElement,materQty: HTMLInputElement) {
    if(locNo == null || locNo.value.toString() == "")
    {
      this.appService.toast('未录入站台编号！');
      return;
    }
    if(this.materType == null || this.materType == "")
    {
      this.appService.toast('未选定物料类型！');
      return;
    }
    if(this.palletType == null || this.palletType == "")
    {
      this.appService.toast('未选定托盘类型！');
      return;
    }
    if(this.MaterName == null ||  this.MaterName == "")
    {
      this.appService.toast('未选定物料编码！');
      return;
    }
    if(palletNo == null || palletNo.value.toString() == "")
    {
      this.appService.toast('未录入载具编号！');
      return;
    }
    if(materQty == null || materQty.value.toString() == "")
    {
      this.appService.toast('未选定入库物料数量！');
      return;
    }

    var materType = '';
    var palletType = '';
    //物料类型核对
    for (let i in this.materTypeNameArr) {
      if (this.materTypeNameArr[i] == this.materType)
        materType = this.materTypeNoArr[i];
    }
    //托盘类型核对
    for (let i in this.palletTypeNameArr) {
      if (this.palletTypeNameArr[i] == this.palletType)
      palletType = this.palletTypeNoArr[i];
    }

    var params = {};
    params = {
      LocNo:locNo.value.toString(),
      MaterType:materType,
      PalletType:palletType,
      MaterNo: materNo.value.toString(),
      PalletNo: palletNo.value.toString(),
      ProductQty:materQty.value.toString(),
      UserName:this.UserName
    };
    this.appService.httpPost(AppGlobal.API.boundInput, params, rs => {
      if (rs == "[]") {
        this.appService.toast('数据库执行出错');
      } else {
        this.appService.toast(rs);
      }
    });
  }

  //清空按钮点击事件
  letEmpty(palletNo: HTMLInputElement, materNo: HTMLInputElement,materQty: HTMLInputElement) 
    {
    var _that = this;
    this.appService.alertConfirm('确定清空当前记录？', function () 
    {
      materNo.value = null;
      palletNo.value = null;    
      materQty.value = null;    
      
      _that.materType = null;
      _that.palletType = null;
    });   
  }
}