import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/GeneralServices/comment.service';
import { Comments } from 'src/app/models/Comments';

@Component({
  selector: 'app-confirm-comments',
  templateUrl: './confirm-comments.component.html',
  styleUrls: ['./confirm-comments.component.scss']
})
export class ConfirmCommentsComponent implements OnInit {

  constructor(
    public _commentService: CommentService
  ) {

  }

  ngOnInit() {
    this._commentService.getCommentsToConfirm();
  }


  acceptComment(commentId: string):void{
    let _comment = new Comments();
    _comment.id=commentId;
    this._commentService.acceptComment(_comment);
    this._commentService.getCommentsToConfirm();
  }

  deleteComment(commentId: number):void{
    this._commentService.deleteComment(commentId);
    this._commentService.getCommentsToConfirm();
  }

}
