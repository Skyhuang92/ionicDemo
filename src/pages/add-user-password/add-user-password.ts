import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-user-password',
  templateUrl: 'add-user-password.html',
})
export class AddUserPasswordPage {
  public adminUsername:any;
  public adminPassWord:any;
  public addUsername:any;
  public addPassword:any;
  public storeNo:string="冷藏库";

  constructor(public navCtrl: NavController, public navParams: NavParams,public appService:AppService,public toastCtrl: ToastController) {
  }
//添加用户名密码
AddData(){
    this.appService.httpPost(AppGlobal.API.addtData,
      { adminUsername:this.adminUsername, adminPassword:this.adminPassWord,addUsername:this.addUsername,addPassword:this.addPassword},
      rs => {
          if (rs == "[]") {
              this.appService.toast('网络连接不可用');
          } else if (rs == 'OK') {                          
              this.appService.toast('添加用户名&密码成功');
          }else if(rs != "OK"&& rs != ""){
               this.appService.toast(rs);
          }else {
              this.toastCtrl.create({
                  message: '登录失败！请检查用户名或密码',
                  duration: 2000,
                  position: 'top'
              }).present();
          }  
      });
  }

  UpdateData(){
    this.appService.httpPost(AppGlobal.API.updateDate,
      { adminUsername:this.adminUsername, adminPassword:this.adminPassWord,addUsername:this.addUsername,addPassword:this.addPassword},
      rs => {
          if (rs == "[]") {
              this.appService.toast('网络连接不可用');
          } else if (rs == 'OK') {                          
              this.appService.toast('更新用户名&密码成功');
          }else if(rs != "OK"&& rs != ""){
               this.appService.toast(rs);
          }else {
              this.toastCtrl.create({
                  message: '登录失败！请检查用户名或密码',
                  duration: 2000,
                  position: 'top'
              }).present();
          }  
      });
  }
  

}
