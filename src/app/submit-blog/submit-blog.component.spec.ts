import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBlogComponent } from './submit-blog.component';

describe('SubmitBlogComponent', () => {
  let component: SubmitBlogComponent;
  let fixture: ComponentFixture<SubmitBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
