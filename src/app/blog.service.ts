import { Injectable } from '@angular/core';
import { Observable, of, ObservedValueOf } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Blog} from './blog'


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  private blogsURL = 'api/blog';
}
