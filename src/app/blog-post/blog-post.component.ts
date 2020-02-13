import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {DetailedBlog} from '../blog'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  detailedBlog: DetailedBlog;

  constructor(private blogService: BlogService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(blogID).subscribe(
      blog => this.detailedBlog = blog
    )
  }

}
