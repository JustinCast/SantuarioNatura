import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdminRootComponent } from "./admin-root/admin-root.component";
import { AddActivityComponent } from "./activity/add-activity/add-activity.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { ShowUsersComponent } from "./user/show-users/show-users.component";
import { ShowActivitiesComponent } from "./activity/show-activities/show-activities.component";
import { PasswordRecoveryComponent } from "./password-recovery/password-recovery.component";
import { CurrentCommentsComponent } from "./comments/current-comments/current-comments.component";
import { ShowReservationsComponent } from "./reservations/show-reservations/show-reservations.component";
import { EditActivityComponent } from "./activity/edit-activity/edit-activity.component";
import { ConfirmCommentsComponent } from "./comments/confirm-comments/confirm-comments.component";
import { LogguedInGuard } from "../loggued-in.guard";

const ROUTES: Routes = [
  {
    path: "admin",
    component: AdminRootComponent,
    children: [
      { path: "add-activity", component: AddActivityComponent, canActivate: [LogguedInGuard] },
      { path: "edit-activity/:edit", component: EditActivityComponent, canActivate: [LogguedInGuard] },
      { path: "show-activities", component: ShowActivitiesComponent, canActivate: [LogguedInGuard] },
      { path: "add-user", component: AddUserComponent, canActivate: [LogguedInGuard] },
      { path: "show-users", component: ShowUsersComponent, canActivate: [LogguedInGuard] },
      { path: "edit-user", component: EditUserComponent, canActivate: [LogguedInGuard] },
      { path: "current-comments", component: CurrentCommentsComponent, canActivate: [LogguedInGuard] },
      { path: "confirm-comments", component: ConfirmCommentsComponent, canActivate: [LogguedInGuard] },
      { path: "show-reservations", component: ShowReservationsComponent, canActivate: [LogguedInGuard] },
      { path: "recovery-password/:username", component: PasswordRecoveryComponent, canActivate: [LogguedInGuard] },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {}
