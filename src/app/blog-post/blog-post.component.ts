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
  blogID: string;

  constructor(private blogService: BlogService,
    private route: ActivatedRoute) { 
      this.blogID = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    // const blogID = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(this.blogID).subscribe(
      blog => this.detailedBlog = blog
    )
  }

  submitComment(content: string, $event): void {
    $event.preventDefault();
    if (!content.trim()) {
      return
    }
    this.blogService.addComment(this.blogID, content).subscribe(
      comm => {
        this.detailedBlog.comms ? this.detailedBlog.comms.unshift(comm) : this.detailedBlog.comms = [comm];
      }
    )
  }

}
