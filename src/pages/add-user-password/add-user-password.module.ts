import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddUserPasswordPage } from './add-user-password';

@NgModule({
  declarations: [
    AddUserPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddUserPasswordPage),
  ],
})
export class AddUserPasswordPageModule {}
