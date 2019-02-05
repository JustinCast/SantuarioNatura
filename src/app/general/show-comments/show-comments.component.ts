import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/GeneralServices/comment.service';
import { DialogManager } from 'src/app/GeneralServices/dialog-manager.service';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.scss']
})
export class ShowCommentsComponent implements OnInit {

  constructor(
    public _commentService:CommentService,
    public dialogManager: DialogManager,
  ) { }

  ngOnInit() {
    this._commentService.getComments();
  }

  openCommentDialog(){
    this.dialogManager.commentDialog();
  }

}
