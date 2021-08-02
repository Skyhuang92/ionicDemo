import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {AppService,AppGlobal} from './../../app/app.service';
import {IonicPage,NavController,NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import { setupUrlSerializer } from 'ionic-angular/umd/navigation/url-serializer';

@IonicPage()
@Component({
  selector: 'page-bindingmaterial',
  templateUrl: 'bindingmaterial.html',
})

export class BindingmaterialPage {
  public login: LoginPage;
  
  PalletNo: string;
  PalletType: string;
  UserName:string;
  ProductQty:string;//产品/托盘数量
   //物料编号数组
   materNo:string;
   materName: string;
   materNoArr: string[];
   materNameArr: string[];
  //物料小类数组
  materTypeNo: string;
  materTypeName: string;
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

  //托盘类型--空托盘选择联动
  MaterTypeChange() {
    this.materNo = ""; 
    this.materName = ""; 
    //获取物料小类
    for (let i in this.materTypeNameArr)  {     
      if(this.materTypeNameArr[i] == this.materTypeName)
      {
        this.materTypeNo = this.materTypeNoArr[i];
      }       
    }

    if (this.materTypeName == "空托盘/垛") {
      this.materNo = "BPALLET";         
      this.materName = "空托盘/垛";
      
      document.getElementById("itemMaterNo").style.display = 'none';
      document.getElementById("itemLineNo").style.display = 'none';
      document.getElementById("itemRackNo").style.display = 'none';
      document.getElementById("itemShiftNo").style.display = 'none';
    }else{
      document.getElementById("itemMaterNo").style.display = 'block';
      document.getElementById("itemLineNo").style.display = 'block';
      document.getElementById("itemRackNo").style.display = 'block';
      document.getElementById("itemShiftNo").style.display = 'block';
       
      this.queryMaterNoList();
    }
  }

  //选择列表赋值 查询加载物料类型列表和托盘类型列表
  queryMaterNoList() {
    var params = {};
    params = {
      MaterType: this.materTypeNo
    };

    this.appService.httpPost(AppGlobal.API.queryMaterNo, params, rs => {
      this.materNoArr = []; 
      this.materNameArr = [];       

      //物料类型列表赋值
      for (let i in rs.materNoArr)  {     
        this.materNoArr.push(rs.materNoArr[i][0]);
        this.materNameArr.push(rs.materNoArr[i][1]);        
      }    
    });
  }

  //托盘号更新
  PalletNoChange(palletNo: HTMLInputElement)
  {
    if(!palletNo.value.toString().startsWith("PB") && palletNo.value.toString().length == 5)
    {
      palletNo.value = 'PB'+ palletNo.value.toString();
    }

    if(palletNo.value.toString().length > 7)
    {
      palletNo.value = '';
    }
  }

  //物料类型名称显示
  MaterNoChange()
  {
     //获取物料名称
     for (let i in this.materNoArr)  {     
      if(this.materNoArr[i] == this.materNo)
      {
        this.materName = this.materNameArr[i];
      }       
    }
  }



  //物料绑定按钮点击事件
  bounding(palletNo: HTMLInputElement,lineNo: HTMLInputElement,
    rackNo: HTMLInputElement,shiftNO: HTMLInputElement,materQty: HTMLInputElement) {
    if(this.materTypeNo == null || this.materTypeNo == "")
    {
      this.appService.toast('未选定物料类型！');
      return;
    }
    if(this.palletType == null || this.palletType == "")
    {
      this.appService.toast('未选定托盘类型！');
      return;
    }
    if(this.materName == null ||  this.materName == "")
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

    var palletType = '';

    //托盘类型核对
    for (let i in this.palletTypeNameArr) {
      if (this.palletTypeNameArr[i] == this.palletType)
      palletType = this.palletTypeNoArr[i];
    }

    var params = {};
    params = {
      MaterType:this.materTypeNo,
      PalletType:palletType,
      MaterNo: this.materNo,
      PalletNo: palletNo.value.toString(),
      ProductQty:materQty.value.toString(),
      LineNo:lineNo.value.toString(),
      ShiftNo:shiftNO.value.toString(),
      RackNo:rackNo.value.toString(),
      UserName:this.UserName
    };
    this.appService.httpPost(AppGlobal.API.bounding, params, rs => {
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
      
      _that.materTypeNo = null;
      _that.palletType = null;
    });   
  }
}
