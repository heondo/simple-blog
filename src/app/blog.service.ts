import { Injectable } from '@angular/core';
import { Observable, of, ObservedValueOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Blog, DetailedBlog, Comment} from './blog'

interface ResponseBlogs {
  success: boolean,
  blogs: Blog[]
}

interface ResponseBlog {
  success: boolean,
  blog: DetailedBlog
}

interface ResponseComment {
  success: boolean,
  comment: Comment
}

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

  getBlog(id: number | string): Observable<DetailedBlog> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const modifiedURL = `${this.blogsURL}/${id}`;
    return this.http.get<ResponseBlog>(modifiedURL).pipe(
      map(res => res.blog),
      catchError(this.handleError<DetailedBlog>('getBlog'))
    )
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<ResponseBlogs>(this.blogsURL)
      .pipe(
        map(res => {
          console.log('fetched blogs');
          return res.blogs || [];
        }),
        catchError(this.handleError<Blog[]>('getBlogs', []))
      );
  }

  addBlog(blogText: string): Observable<Blog> {
    return this.http.post(this.blogsURL, { blogText }, this.httpOptions).pipe(
      tap((addedBlog: Blog) => console.log(`added blog post with id =${addedBlog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    )
  }

  addComment(postID: number | string, content: string): Observable<Comment> {
    const commentURL = this.blogsURL + '/comment'
    return this.http.post<ResponseComment>(commentURL, {
      postID, content
    }, this.httpOptions).pipe(
      map(res => {
        console.log('added comment');
        return res.comment;
      }),
      catchError(this.handleError<Comment>('addedComment'))
    )
  }

  searchBlogs(searchTerm: string): Observable<any> {
    console.log(searchTerm);
    const searchURL = this.blogsURL + `/search?q=${searchTerm}`;
    return this.http.get(searchURL).pipe(
      tap(res => {
        console.log('added string');
        // return res.comment;
      }),
      catchError(this.handleError<Comment>('searchComments')
    ))
  }
}
