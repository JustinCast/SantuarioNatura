import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../GeneralServices/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFG: FormGroup;
  icon: string = "priority_high";
  panelOpenState = false;
  username: string = "";
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private _fb: FormBuilder,
    public _userService: UserService
  ) {
    this.loginFG = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.loginFG.valueChanges.subscribe(() => {
      if (!this.loginFG.valid) this.icon = "priority_high";
      else this.icon = "done";
    });
  }
  

  ngAfterViewInit() {
  }

  onSubmit() {
    this._userService.loading = true;
    this._userService.login(
      this.loginFG.controls["username"].value,
      this.loginFG.controls["password"].value
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendmail(){
    this._userService.recoveryPassword(this.username);
  }

  setState(state: boolean) {
    this.panelOpenState = state;
  }
}
