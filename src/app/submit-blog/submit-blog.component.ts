import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {Blog} from '../blog'

@Component({
  selector: 'app-submit-blog',
  templateUrl: './submit-blog.component.html',
  styleUrls: ['./submit-blog.component.scss']
})
export class SubmitBlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  submitPost(): void {
    this.blogService.addPost('this is a new post to check the server').subscribe();
  }

  ngOnInit(): void {
  }

}
