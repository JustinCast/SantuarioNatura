import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRootComponent } from "./admin-root/admin-root.component";
import { AddActivityComponent } from "./activity/add-activity/add-activity.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { ShowUsersComponent } from "./user/show-users/show-users.component";
import { SharedModule } from "../shared/shared.module";
import { ShowActivitiesComponent } from './activity/show-activities/show-activities.component';
import { LoginComponent } from './login/login.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PickLocationComponent } from './activity/pick-location/pick-location.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ShowReservationsComponent } from './reservations/show-reservations/show-reservations.component';
import { RatesDialogComponent } from "./activity/rates-dialog/rates-dialog.component";
import { EditActivityComponent } from "./activity/edit-activity/edit-activity.component";
import { EditRatesComponent } from './activity/edit-rates/edit-rates.component';

import { ConfirmCommentsComponent } from "./comments/confirm-comments/confirm-comments.component";
import { CurrentCommentsComponent } from './comments/current-comments/current-comments.component';
import { AdminRoutingModule } from "./admin-routing.module";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FileUploadModule
  ],
  declarations: [
    AdminRootComponent,
    AddActivityComponent,
    AddUserComponent,
    EditUserComponent,
    ShowUsersComponent,
    ShowActivitiesComponent,
    LoginComponent,
    EditActivityComponent,
    PickLocationComponent,
    PasswordRecoveryComponent,
    CurrentCommentsComponent,
    ShowReservationsComponent,
    RatesDialogComponent,
    EditRatesComponent,
    ConfirmCommentsComponent
  ],
  exports: [
    AdminRootComponent,
    LoginComponent,
    PasswordRecoveryComponent
  ],
  entryComponents: [
    LoginComponent,
    RatesDialogComponent,
    PickLocationComponent,
    EditUserComponent,
    EditRatesComponent,
  ]
})
export class AdminModule {}
