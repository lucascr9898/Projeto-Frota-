import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverviewExample } from './cards';

describe('CardOverviewExample', () => {
  let component: CardOverviewExample;
  let fixture: ComponentFixture<CardOverviewExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOverviewExample],
    }).compileComponents();

    fixture = TestBed.createComponent(CardOverviewExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
