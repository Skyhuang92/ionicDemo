import {Component} from '@angular/core';
import {IonicPage,NavController,NavParams} from 'ionic-angular';
import {AppService,AppGlobal} from './../../app/app.service';

@IonicPage()
@Component({
  selector: 'page-storage-out-list',
  templateUrl: 'storage-out-list.html',
})
export class StorageOutListPage {
  public bin_No: string;
  public taskNo: string;
  public palletNo: string;
  public store: string;
  public userName:string;
  constructor(public appService: AppService, public navCtrl: NavController, public navParams: NavParams) {
    this.store = navParams.get('store');
    this.userName = navParams.get('userName');
  }
  //点击出库按钮
  storageOutButtonClick(rowLine: HTMLInputElement, colLine: HTMLInputElement, floorLine: HTMLInputElement, binNo: HTMLInputElement) {
    if (this.store == "原材料库") {
      if ((rowLine.value.length == 0 || colLine.value.length == 0 || floorLine.value.length == 0) && binNo.value.length == 0) {
        this.appService.toast('请填写完整库位编号或库位所在的排 列 层');
      } else if ((rowLine.value.length > 0 || colLine.value.length > 0 || floorLine.value.length > 0) && binNo.value.length > 0) {
        this.appService.toast('请勿重复填写');
      }
      //按排列层出库
      else if ((rowLine.value.length > 0 && colLine.value.length > 0 && floorLine.value.length > 0) && binNo.value.length == 0) {
        var fuck = rowLine.value.toString() + colLine.value.toString() + floorLine.value.toString();
        if (fuck.length != 6) {
          this.appService.alert("输入排列层格式不正确，请重新输入");
          return;
        } else {
          if (rowLine.value == '01') {
            fuck = '01' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '02') {
            fuck = '02' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '03') {
            fuck = '03' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '04') {
            fuck = '04' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '05') {
            fuck = '05' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '06') {
            fuck = '06' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '07') {
            fuck = '07' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else if (rowLine.value == '08') {
            fuck = '08' + colLine.value.toString() + floorLine.value.toString() + '01';
          } else {
            this.appService.alert('输入排超出最大排数！请重新输入');
            return;
          }
          this.appService.httpPost(AppGlobal.API.getOutStorageInfo, {
              BinNo: fuck,
              StoreNo: this.store,
              UserName:this.userName
            },
            rs => {
              if (rs.taskNo == "此库位没有货物") {
                this.appService.toast("生成任务失败");
                this.taskNo = rs.TaskNo;
                this.bin_No = rs.BinNo;
                this.palletNo = rs.PalletNo;
              } else if (rs.taskNo != []) {
                this.appService.toast('生成订单成功');
                this.taskNo = rs.TaskNo;
                this.bin_No = rs.BinNo;
                this.palletNo = rs.PalletNo;
              } else {
                this.appService.toast(rs);
                this.taskNo = rs.TaskNo;
                this.bin_No = rs.BinNo;
                this.palletNo = rs.PalletNo;
              }
            });
        }
      }
      //按库位号出库       
      else if ((rowLine.value.length == 0 || colLine.value.length == 0 || floorLine.value.length == 0) && binNo.value.length > 0) {
        this.appService.httpPost(AppGlobal.API.getOutStorageInfo, {
          BinNo: binNo.value,
          StoreNo: this.store,
          UserName:this.userName
        }, rs => {
          if (rs.TaskNo == "此库位没有货物") {
            this.appService.toast("生成任务失败");
            this.taskNo = rs.TaskNo;
            this.bin_No = rs.BinNo;
            this.palletNo = rs.PalletNo;
          } else if (rs.taskNo != []) {
            this.appService.toast('已成功生成的VS的任务');
            this.taskNo = rs.TaskNo;
            this.bin_No = rs.BinNo;
            this.palletNo = rs.PalletNo;
          } else {
            this.appService.alert("生成任务失败！");
          }
        });
      }
    } 
  }
  //清空界面
  clearButtonClick(rowLine: HTMLInputElement, colLine: HTMLInputElement, floorLine: HTMLInputElement, binNo: HTMLInputElement) {
    var _that = this;
    this.appService.alertConfirm('确定清空界面内容吗？', function () {
      _that.bin_No = null;
      _that.taskNo = null;
      _that.palletNo = null;
      rowLine.value = null;
      colLine.value = null;
      floorLine.value = null;
      binNo.value = null;
    });

  }

}
