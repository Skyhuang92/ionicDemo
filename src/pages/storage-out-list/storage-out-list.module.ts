import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorageOutListPage } from './storage-out-list';

@NgModule({
  declarations: [
    StorageOutListPage,
  ],
  imports: [
    IonicPageModule.forChild(StorageOutListPage),
  ],
})
export class StorageOutListPageModule {}
