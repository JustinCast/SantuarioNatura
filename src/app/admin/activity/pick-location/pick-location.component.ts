import { Component, OnInit } from '@angular/core';
import LocationPicker from 'location-picker';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pick-location',
  templateUrl: './pick-location.component.html',
  styleUrls: ['./pick-location.component.scss']
})
export class PickLocationComponent implements OnInit {
  lp: LocationPicker;
  constructor(public dialogRef: MatDialogRef<PickLocationComponent>){}

  ngOnInit(){
    this.lp = new LocationPicker('map');
  }
  
  setLocation() {
    this.dialogRef.close(this.lp.getMarkerPosition())
  }

}
