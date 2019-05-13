import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/GeneralServices/activity.service';
import { DialogManager } from 'src/app/GeneralServices/dialog-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public activityService: ActivityService,
    private dialogManager: DialogManager,
  ) { }

  ngOnInit() {
    this.activityService.getAllActivities();
  }

  openDevsInfo() {
    this.dialogManager.openDevsInfo();
  }
}
