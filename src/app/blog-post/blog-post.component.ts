import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {DetailedBlog} from '../blog`'

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

}
