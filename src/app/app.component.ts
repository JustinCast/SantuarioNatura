import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./GeneralServices/auth.service";
import { DialogManager } from "./GeneralServices/dialog-manager.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public userManagementCollapsed = true;
  public activityManagementCollapsed = true;
  public serviceManagementCollapsed = true;
  private _opened: boolean = false;
  actualDate: Date = new Date();
  step = 0;

  constructor(
    private translate: TranslateService,
    private dialogManager: DialogManager,
    public auth: AuthService
  ) {
    translate.setDefaultLang("en");
  }
  
  setStep(index: number) {
    this.step = index;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

  openDialog() {
    this.dialogManager.open();
  }

  logout() {
    this.auth.logout();
  }

}
