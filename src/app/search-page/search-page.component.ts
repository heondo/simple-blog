import { Component, OnInit } from '@angular/core';
import {DetailedBlog} from '../blog'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  thoughts$: DetailedBlog[];

  constructor() { }

  ngOnInit(): void {
  }

}
