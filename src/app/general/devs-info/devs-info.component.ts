import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-devs-info',
  templateUrl: './devs-info.component.html',
  styleUrls: ['./devs-info.component.scss']
})
export class DevsInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DevsInfoComponent>) { }

  ngOnInit() {
  }

}
