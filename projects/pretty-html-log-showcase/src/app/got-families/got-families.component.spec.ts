import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GotFamiliesComponent } from './got-families.component';
import { DebugElement } from '@angular/core';

describe('GotFamiliesComponent', () => {
  let component: GotFamiliesComponent;
  let fixture: ComponentFixture<GotFamiliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatTabsModule, MatCardModule],
      declarations: [GotFamiliesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the starks family by default', () => {
    const starks = ['Sansa Stark', 'Aria Stark', 'Ned Stark'];
    const familieMemebersElements = fixture.debugElement.queryAll(By.css('li'));
    const familieMembers = familieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(familieMembers).toEqual(starks);
  });

  it(`should display the Targaryen family once we click on the Targaryen tab`, async () => {
    const targaryens = [
      'Daenerys Targaryen',
      'Egon Targaryen',
      'Rhaegar Targaryen'
    ];

    const targaryenTab = fixture.debugElement.queryAll(
      By.css('.mat-tab-label')
    )[1];
    targaryenTab.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    console.logNgHTML(fixture);

    const actualFamilieMemebersElements = fixture.debugElement.queryAll(
      By.css('li')
    );

    console.logNgHTML(actualFamilieMemebersElements);

    const actualFamilieMembers = actualFamilieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(actualFamilieMembers).toEqual(targaryens);
  });
});
