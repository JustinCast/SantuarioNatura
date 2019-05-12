import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginComponent } from "../admin/login/login.component";
//import { EditServiceDialogComponent } from '../admin/service/edit-service-dialog/edit-service-dialog.component';
//import { ServiceModel } from '../models/service';
import { PickLocationComponent } from "../admin/activity/pick-location/pick-location.component";
import { EditUserComponent } from "../admin/user/edit-user/edit-user.component";
import { User } from "../models/user";
import { DevsInfoComponent } from "../general/devs-info/devs-info.component";
import { SeeLocationComponent } from "../general/see-location/see-location.component";
import { RatesDialogComponent } from "../admin/activity/rates-dialog/rates-dialog.component";
import { EditRatesComponent } from "../admin/activity/edit-rates/edit-rates.component";
import { CommentsComponent } from "../general/comments/comments.component";
import { ShowCommentComponent } from "../admin/reservations/show-reservations/show-comment/show-comment.component";

@Injectable({
  providedIn: "root"
})
export class DialogManager {
  constructor(private dialog: MatDialog) {}

  public showComment(comment: string) {
    this.dialog.open(ShowCommentComponent, {
      width: "40%",
      height: "40%",
      panelClass: "dialog",
      data: comment
    });
  }

  public open() {
    let dialogRef: MatDialogRef<LoginComponent>;
    console.log(window.innerHeight)
    dialogRef = this.dialog.open(LoginComponent, {
      width: `${window.innerWidth < 400 ? '90%' : '50%'}`,
      height: `${window.innerHeight <= 812 ? '55%' : '50%'}`,
      panelClass: "dialog"
    });
    return dialogRef.afterClosed();
  }

  public rates(): any {
    let dialogRef: MatDialogRef<RatesDialogComponent>;
    dialogRef = this.dialog.open(RatesDialogComponent, {
      width: "70%",
      height: "60%",
      panelClass: "dialog"
    });
    return dialogRef.afterClosed();
  }

  public editRates(id_activity) {
    this.dialog.open(EditRatesComponent, {
      data: id_activity,
      width: "70%",
      height: "70%",
      panelClass: "dialog"
    });
  }

  public pickupLocation() {
    let dialogRef: MatDialogRef<PickLocationComponent>;
    dialogRef = this.dialog.open(PickLocationComponent, {
      width: "70%",
      height: "70%",
      panelClass: "dialog"
    });
    return dialogRef.afterClosed();
  }

  public editUserDialog(user: User) {
    this.dialog.open(EditUserComponent, {
      data: user,
      width: "70%",
      height: "70%",
      panelClass: "dialog"
    });
  }

  public openDevsInfo() {
    this.dialog.open(DevsInfoComponent, {
      width: "99%",
      height: "84%",
      panelClass: "dialog"
    });
  }

  public activityLocation(location: any, edit: boolean) {
    return this.dialog
      .open(SeeLocationComponent, {
        width: "70%",
        height: "70%",
        panelClass: "dialog",
        data: {
          location: location,
          edit: edit
        }
      })
      .afterClosed();
  }

  public commentDialog() {
    return this.dialog.open(CommentsComponent, {
      width: "40%",
      height: "50%",
      panelClass: "dialog"
    });
  }
}
