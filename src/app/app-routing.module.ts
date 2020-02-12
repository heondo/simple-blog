import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitBlogComponent } from './submit-blog/submit-blog.component'
import { BlogsListComponent } from './blogs-list/blogs-list.component';


const routes: Routes = [
  {
    path: 'submit-blog', component: SubmitBlogComponent
  },
  {
    path: 'blogs-list', component: BlogsListComponent
  },
  {
    path: '', redirectTo: "blogs-list", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
