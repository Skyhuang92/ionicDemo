import {Component} from '@angular/core';
import {IonicPage,NavController,NavParams} from 'ionic-angular';
import {AppService,AppGlobal} from './../../app/app.service';
import {ViewChild} from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-palletquery',
  templateUrl: 'palletquery.html',
})
export class PalletqueryPage {
  @ViewChild('palletNo') input;
  palletNo: string;
  store: string;
  material: string;
  proweight: string;
  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalletqueryPage');
  }
  //输入条码信息并查询托盘信息
  focusInputp(palletNo: HTMLInputElement) {
    if (palletNo.value.length == 0) {
      this.appService.toast('请扫描托盘条码');
    } else {
      this.palletNo = palletNo.value;
      this.querypallet(palletNo);
    }
  }
  //查询托盘信息
  querypallet(palletNo: HTMLInputElement) {
    var params = {};
    params = {
      PalletNo: this.palletNo
    };
    this.appService.httpPost(AppGlobal.API.quaryPallet, params, rs => {
      if (rs == null) {
        this.appService.toast('数据库执行出错');

      } else {
        if (rs.WhNo == '01') {
          this.store = "冷藏库";
        } else if (rs.WhNo == '02') {
          this.store = "保鲜库";
        } else {
          this.store = rs.WhNo
        }
        this.material = rs.MaterialNo;
        this.proweight = rs.ProductWeight;
      }
    });

  }
  //清空界面
  emptypallet(pallet: HTMLInputElement) {
    this.store = null;
    this.material = null;
    this.proweight = null
    pallet.value = null;
    this.input.nativeElement.focus();
    this.input.nativeElement.select();
  }
}
