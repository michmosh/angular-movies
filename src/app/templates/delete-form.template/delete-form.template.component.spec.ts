import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForm.TemplateComponent } from './delete-form.template.component';

describe('DeleteForm.TemplateComponent', () => {
  let component: DeleteForm.TemplateComponent;
  let fixture: ComponentFixture<DeleteForm.TemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteForm.TemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteForm.TemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
