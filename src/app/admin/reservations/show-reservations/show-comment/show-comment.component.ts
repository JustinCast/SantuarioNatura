import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.scss']
})
export class ShowCommentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public comment: string
  ) { }

  ngOnInit() {
  }

}
