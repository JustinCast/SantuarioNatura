import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { User } from "src/app/models/user";
import { UserService } from "src/app/GeneralServices/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  change: boolean = false;
  newPassword: string = "";
  confirmPassword: string = "";
  verified: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _user: UserService
  ) {}

  ngOnInit() {}

  updateUser() {
    this._user.updateUser(this.user);
  }

  verifyPassword(password: string) {
    this._user.verifyPassword(password).subscribe(
      state => {
        if (state["?column?"]) {
          this.verified = true;
          this._user.ui.openSnackBar(
            "Contraseña verificada exitosamente",
            "Ok",
            2500
          );
        }
        else{
          this._user.ui.openSnackBar(
            "Contraseña incorrecta",
            "Ok",
            2500
          );
        }
      },
      (err: HttpErrorResponse) => this._user.handleError(err)
    );
  }

  changePassword() {
    if(this.newPassword.length !== 0 && this.confirmPassword.length !== 0){
      if(this.newPassword.localeCompare(this.confirmPassword) === 0)
        this._user.updatePassword(this.newPassword, this.user.username);
      else
        this._user.ui.openSnackBar('Las contraseñas no coinciden', 'Ok', 2500);
    }else
      this._user.ui.openSnackBar('Introduzca una contraseña válida', 'Ok', 2500);
  }
}
