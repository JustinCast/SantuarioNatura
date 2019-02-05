import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../GeneralServices/user.service";
import { DialogManager } from "src/app/GeneralServices/dialog-manager.service";

@Component({
  selector: "app-show-users",
  templateUrl: "./show-users.component.html",
  styleUrls: ["./show-users.component.scss"]
})
export class ShowUsersComponent implements OnInit {
  constructor(
    public _userService: UserService,
    private _dialog: DialogManager
  ) {}

  ngOnInit() {
    this._userService.users = [];
    this._userService.loading = true;
    this._userService.getUsers();
  }

  deleteUser(index: number) {
    this._userService.deleteUser(index);
  }

  editUser(index: number) {
    this._dialog.editUserDialog(this._userService.users[index]);
  }
}
