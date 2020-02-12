import { Injectable } from '@angular/core';
import { Observable, of, ObservedValueOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Blog} from './blog'


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // TODO: create a blogPosts$ observable or w/e it was called here and have other components built off of this.
  // not even sure how to do that LOL

  constructor(private http: HttpClient) { }

  private blogsURL = 'api/blog';

  private handleError<T> (operation = 'operation', result?: T) {
    // the :T and <T> here are placeholders to say i do not know what type it will return, but if anything it will be based off
    // of the optional result parameter
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsURL)
      .pipe(
        tap(_ => console.log('fetched blogs')),
        catchError(this.handleError<Blog[]>('getBlogs', []))
      );
  }

  addBlog(blogText: string): Observable<Blog> {
    return this.http.post(this.blogsURL, { blogText }, this.httpOptions).pipe(
      tap((addedBlog: Blog) => console.log(`added blog post with id =${addedBlog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    )
  }
}
