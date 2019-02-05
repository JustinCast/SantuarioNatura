import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRootComponent } from './general-root.component';

describe('GeneralRootComponent', () => {
  let component: GeneralRootComponent;
  let fixture: ComponentFixture<GeneralRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
