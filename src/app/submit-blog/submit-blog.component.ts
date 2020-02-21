import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {Blog} from '../blog'

@Component({
  selector: 'app-submit-blog',
  templateUrl: './submit-blog.component.html',
  styleUrls: ['./submit-blog.component.scss']
})
export class SubmitBlogComponent implements OnInit {

  contructor(private blogService: BlogService, private router: Router) { }

  submitPost(blogText: string, $event): void {
    $event.preventDefault();
    const trimmedText = blogText.trim();
    if (!trimmedText) {
      return;
    }
    this.blogService.addBlog(trimmedText).subscribe(
      _ => this.router.navigateByUrl('/blogs-list')
    );
    
  }

  ngOnInit(): void {
  }

}
