import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivityService } from "../../../GeneralServices/activity.service";
import { Activity } from "../../../models/Activity";
import { DialogManager } from "../../../GeneralServices/dialog-manager.service";
import { UIUtilsService } from "../../../GeneralServices/uiutils.service";
import { Rate } from "../../../models/Rate";

@Component({
  selector: "app-add-activity",
  templateUrl: "./add-activity.component.html",
  styleUrls: ["./add-activity.component.scss"]
})
export class AddActivityComponent implements OnInit {
  public activityFG: FormGroup;
  icon = "priority_high";
  images: Array<any> = [];
  difficulty: Array<string> = ["Fácil - Easy", "Media - Medium", "Difícil - Hard"];
  access: Array<string> = ["En carro - By car", "A caballo - By horse", "Caminando - By walking"];
  duration: Array<string> = ["1", "2", "2-5", "5-7", "7+"]
  location: Object;
  rates: Array<Rate>;
  iconRates: string = "add";
  building: boolean = false;
  constructor(
    private _fb: FormBuilder,
    public _activityService: ActivityService,
    private _dialog: DialogManager,
    private _ui: UIUtilsService
  ) {
    this.activityFG = this._fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      difficulty: ["", Validators.required],
      includes: ["", Validators.required],
      duration: ["", Validators.required],
      bring: ["", Validators.required],
      access: ["", Validators.required],
      inOffer: [true],
    });
  }

  ngOnInit() {
    this.activityFG.valueChanges.subscribe(() => {
      if (!this.activityFG.valid) this.icon = "priority_high";
      else this.icon = "check";
    });
  }


  onSubmit() {
    let activity = new Activity(
      this.activityFG.get("name").value,
      this.activityFG.get("description").value,
      this.activityFG.get("difficulty").value,
      this.activityFG.get("includes").value,
      this.activityFG.get("duration").value,
      this.activityFG.get("bring").value,
      this.location,
      this.activityFG.get("access").value,
      0,
      this.activityFG.get('inOffer').value,
      this.rates,
    );
    this._activityService.saveActivity(activity);
  }

  pickLocation() {
    this._dialog.pickupLocation().subscribe(
      loc => {
        if(!loc && !this.location)
          this._ui.openSnackBar('Recuerde que debe seleccionar una ubicación', 'Ok', 2500)
        if(loc){
          this.location = loc;
          this._ui.openSnackBar('Ubicación añadida con éxito', 'Ok', 2500)
        }
      }
    );
  }

  addRates() {
    this._dialog.rates().subscribe(
      result => {
        if(result){
          this.rates = result;
          this.iconRates = "done";
        }
        else
          this._ui.openSnackBar("No agregó ninguna tarifa", 'Ok', 2500);
      }
    )
  }
}
