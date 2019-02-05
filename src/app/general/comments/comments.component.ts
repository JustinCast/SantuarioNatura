import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/GeneralServices/comment.service';
import { Comments } from 'src/app/Models/Comments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  icon = "priority_high";
  commentFG: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public _commentService: CommentService
  ) { 
    this.commentFG = this._fb.group({
      name:["",Validators.required],
      comment:["",Validators.required]
    });
  }

  ngOnInit() {
    this.commentFG.valueChanges.subscribe(() => {
      if (this.commentFG.valid) this.icon = "done";
      else this.icon = "priority_high";
    });
  }

  onSubmit() {
    let comment= new Comments();
    comment.name=this.commentFG.get("name").value;
    comment.comment=this.commentFG.get("comment").value;
    console.log(comment);
    this._commentService.saveComment(comment);
    this.commentFG.reset();
  }
}
