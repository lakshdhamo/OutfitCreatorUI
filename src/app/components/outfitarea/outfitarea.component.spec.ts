import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitareaComponent } from './outfitarea.component';

describe('OutfitareaComponent', () => {
  let component: OutfitareaComponent;
  let fixture: ComponentFixture<OutfitareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutfitareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
