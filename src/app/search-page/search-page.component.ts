import { Component, OnInit } from '@angular/core';
import {DetailedBlog} from '../blog';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  blogs$: any;
  private searchTerm = new Subject<string>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogs$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.blogService.searchBlogs(term))
    )
  }

  search(term: string): void {
    // console.log(term)
    this.searchTerm.next(term);
  }

}
