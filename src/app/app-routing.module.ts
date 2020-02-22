import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitBlogComponent } from './submit-blog/submit-blog.component'
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogPostComponent} from './blog-post/blog-post.component'
import { SearchPageComponent } from './search-page/search-page.component';


const routes: Routes = [
  {
    path: 'submit-blog', component: SubmitBlogComponent
  },
  {
    path: 'blogs-list', component: BlogsListComponent
  },
  {
    path: 'search', component: SearchPageComponent
  },
  {
    path: '', redirectTo: "blogs-list", pathMatch: "full"
  },
  {
    path: 'blog/:id', component: BlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
