import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitBlogComponent } from './submit-blog/submit-blog.component'


const routes: Routes = [
  {
    path: 'submit-blog', component: SubmitBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
