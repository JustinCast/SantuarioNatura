import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import LocationPicker from "location-picker";

@Component({
  selector: "app-see-location",
  templateUrl: "./see-location.component.html",
  styleUrls: ["./see-location.component.scss"]
})
export class SeeLocationComponent implements OnInit {
  lp: LocationPicker;
  constructor(
    public dialogRef: MatDialogRef<SeeLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let location = JSON.parse(this.data.location);
    console.log(location);
    this.lp = new LocationPicker("see-loc", {
      lat: location.lat,
      lng: location.lng
    });
  }

  editLoc() {
    this.dialogRef.close(this.lp.getMarkerPosition());
  }
}
