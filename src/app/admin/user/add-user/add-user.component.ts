import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../GeneralServices/user.service';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userFG: FormGroup
  public icon: string = "priority_high";

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) { 
    this.userFG = this._fb.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'role': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    })
  }

  ngOnInit() {
    this.userFG.valueChanges.subscribe(() => {
      if (!this.userFG.valid) this.icon = "priority_high";
      else this.icon = "check";
    });
  }

  onSubmit() {
    this._userService.saveUser(
      new User(
        this.userFG.controls['name'].value,
        this.userFG.controls['username'].value,
        this.userFG.controls['email'].value,
        this.userFG.controls['password'].value,
        true
      )
    );
    this.userFG.reset();
  }
}
