import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import { ToastController } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { AddUserPasswordPage} from '../add-user-password/add-user-password';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loginParams = {userNamePar:""};
    public list: any[];
    //默认是记住密码
    public isRemember:boolean = true;
    public userName:any;
    public passWord:any;
    constructor(private navCtrl: NavController, public appService: AppService,private storage:Storage,
        public modalCtrl: ModalController,
        private backButtonService: BackButtonService,
        private platform: Platform,
        public toastCtrl: ToastController) {
        platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(null);
        });
    //获取用户名和密码 用于双向数据绑定在界面显示账号密码
    this.userName = window.localStorage.getItem('username');
    this.passWord = window.localStorage.getItem('password');
    }
 
    //登录
    logIn(username: HTMLInputElement, password: HTMLInputElement) {
        this.userName = username.value;
        this.passWord = password.value;    
         if (this.userName.value == "")
         {
             this.userName = window.localStorage.getItem('username');
         }
         if (this.passWord.value == "")
         {
             this.passWord = window.localStorage.getItem('password');
         }

        if (this.userName.value == "") {
            this.toastCtrl.create({
                message: '请输入账号',
                duration: 2000,
                position: 'top'
            }).present();
        } else if (this.passWord.value == "") {
            this.toastCtrl.create({
                message: '请输入密码',
                duration: 2000,
                position: 'top'
            }).present();}
         else {
             this.loginParams.userNamePar = this.userName;
            this.appService.httpPost(AppGlobal.API.getCheckResult,
                { UserName: this.userName, PassWord: this.passWord},
                rs => {
                    if (rs == "[]") {
                        this.appService.toast('网络连接不可用');
                    } else if (rs == '1') {                          
                        this.navCtrl.setRoot(TabsPage,this.loginParams);
                        //登陆成功，记住登陆密码
                        if(this.isRemember){
                            window.localStorage.setItem('username',this.userName);
                            window.localStorage.setItem('password',this.passWord);
                           }
                        else{
                            window.localStorage.removeItem('username');
                            window.localStorage.removeItem('password');
                        }
                    } else {                      
                        this.toastCtrl.create({
                            message: '登录失败！请检查用户名或密码' + rs,
                            duration: 2000,
                            position: 'top'
                        }).present();
                    }  
                });
        }
    }

    addPassWord(){
      this.navCtrl.push(AddUserPasswordPage);
    }
}
