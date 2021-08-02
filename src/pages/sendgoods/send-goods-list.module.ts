import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendGoodsListPage } from './send-goods-list';

@NgModule({
  declarations: [
    SendGoodsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SendGoodsListPage),
  ],
})
export class SendGoodsListPageModule {}
