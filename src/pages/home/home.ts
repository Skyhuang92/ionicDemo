import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';
import { Platform, Tabs, NavParams } from 'ionic-angular';
import { StorageOutListPage } from "../storage-out-list/storage-out-list";
import { SendGoodsListPage } from "../sendgoods/send-goods-list";
import { PalletqueryPage } from "../palletquery/palletquery";
import { BindingmaterialPage } from "../bindingmaterial/bindingmaterial";
import { PalletRequestInPage } from '../pallet-request-in/pallet-request-in';
import { BpalletoutPage } from '../bpalletout/bpalletout';
import { MaterOutPage } from '../materout/materout';
import { TaskRequestErrPage } from '../task-request-err/task-request-err';
import { StockreturnPage } from '../stockreturn/stockreturn';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public receive:any;
    categories: Array<any> = [];
    //依赖注入
    constructor(public appService: AppService, public navCtrl: NavController ,public navparam:NavParams) {
        this.getCategories();
        this.receive = navparam;
    }
    //获取分类
    getCategories() {
        this.appService.httpGet(AppGlobal.API.getCategories, null, rs => {
            this.categories = rs;
        })
    }
    //点击跳转页面
    goCategoryList(item) {
        switch (item.Id) {
            case 1:
            this.navCtrl.push(BindingmaterialPage,this.receive);
            break;
        case 2:
            this.navCtrl.push(PalletRequestInPage,this.receive);
            break;
        case 3:
            this.navCtrl.push(PalletqueryPage,this.receive);
            break;
        case 4:
            this.navCtrl.push(StorageOutListPage,this.receive);
            break;
        case 5:
            this.navCtrl.push(SendGoodsListPage,this.receive);
            break;
        case 6:
            this.navCtrl.push(BpalletoutPage,this.receive);
            break;
        case 7:
            this.navCtrl.push(MaterOutPage,this.receive);
            break;
         case 8:
            this.navCtrl.push(TaskRequestErrPage,this.receive);
            break;
        case 9:
            this.navCtrl.push(StockreturnPage,this.receive);
            break;
        default:
            break;
        }

    }
}
