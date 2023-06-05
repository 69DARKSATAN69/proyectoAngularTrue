import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditDeleteComponent } from './post-edit-delete.component';

describe('PostEditDeleteComponent', () => {
  let component: PostEditDeleteComponent;
  let fixture: ComponentFixture<PostEditDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEditDeleteComponent]
    });
    fixture = TestBed.createComponent(PostEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
