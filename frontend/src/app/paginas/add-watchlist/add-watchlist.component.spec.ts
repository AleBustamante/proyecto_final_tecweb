import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWatchlistComponent } from './add-watchlist.component';

describe('AddWatchlistComponent', () => {
  let component: AddWatchlistComponent;
  let fixture: ComponentFixture<AddWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWatchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
