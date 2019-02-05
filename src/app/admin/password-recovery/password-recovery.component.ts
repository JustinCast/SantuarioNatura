import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UIUtilsService } from "src/app/GeneralServices/uiutils.service";
import { UserService } from "src/app/GeneralServices/user.service";

@Component({
  selector: "app-password-recovery",
  templateUrl: "./password-recovery.component.html",
  styleUrls: ["./password-recovery.component.scss"]
})
export class PasswordRecoveryComponent implements OnInit {
  username: string;
  resetPasswordFG: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _ui: UIUtilsService,
    private _user: UserService
  ) {
    this.resetPasswordFG = this._fb.group(
      {
        password: ["", Validators.required],
        confirm: [""]
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (
      this.resetPasswordFG.get("password").value !==
      this.resetPasswordFG.get("confirm").value
    ) {
      this._ui.openSnackBar("¡Las contraseñas no coinciden!", "Ok", 2500);
    } else {
      this._user.updatePassword(
        this.resetPasswordFG.get("password").value,
        this.username
      );
    }
  }
}
