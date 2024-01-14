import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyToolbarComponent } from './my-toolbar.component';

describe('MyToolbarComponent', () => {
  let component: MyToolbarComponent;
  let fixture: ComponentFixture<MyToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyToolbarComponent]
    });
    fixture = TestBed.createComponent(MyToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
