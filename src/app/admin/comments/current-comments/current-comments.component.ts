import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/GeneralServices/comment.service';

@Component({
  selector: 'app-current-comments',
  templateUrl: './current-comments.component.html',
  styleUrls: ['./current-comments.component.scss']
})
export class CurrentCommentsComponent implements OnInit {

  constructor(
    public _commentService: CommentService
    ) { }

    ngOnInit() {
      this._commentService.getComments();
    }

    deleteComment(commentId: number):void{
      this._commentService.deleteComment(commentId);
      this._commentService.getComments();
    }

}
