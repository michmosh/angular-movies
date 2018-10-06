import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormTemplateComponent } from './movie-form.template.component';

describe('EditForm.TemplateComponent', () => {
  let component: MovieFormTemplateComponent;
  let fixture: ComponentFixture<MovieFormTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFormTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
