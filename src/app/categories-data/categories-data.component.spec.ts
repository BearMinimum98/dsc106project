import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDataComponent } from './categories-data.component';

describe('CategoriesDataComponent', () => {
  let component: CategoriesDataComponent;
  let fixture: ComponentFixture<CategoriesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
