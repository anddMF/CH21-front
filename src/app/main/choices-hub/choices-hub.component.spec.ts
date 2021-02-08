import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesHubComponent } from './choices-hub.component';

describe('ChoicesHubComponent', () => {
  let component: ChoicesHubComponent;
  let fixture: ComponentFixture<ChoicesHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoicesHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
