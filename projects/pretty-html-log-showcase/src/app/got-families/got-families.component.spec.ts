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

  /*
  it('must test the different types', () => {
    console.logNgHTML(fixture);
    (console as any).logNgHTML(fixture.debugElement);
    (console as any).logNgHTML(fixture.debugElement.nativeElement);
    (console as any).logNgHTML(fixture.debugElement.queryAll(By.css('div')));

    const elements = fixture.debugElement.queryAll(By.css('div')).map(e => e.nativeElement);

    (console as any).logNgHTML(fixture.debugElement.queryAll(By.css('div')).map(e => e.nativeElement));
    (console as any).logNgHTML('Somehting else');
    console.log(fixture instanceof ComponentFixture);
    console.log(fixture.debugElement instanceof DebugElement);

    expect(true).toBeTruthy();
  });
   */

  it('should display the starks family by default', () => {
    const starks = ['Sansa Stark', 'Aria Stark', 'Ned Stark'];
    const familieMemebersElements = fixture.debugElement.queryAll(By.css('li'));
    const familieMembers = familieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(familieMembers).toEqual(starks);
  });

  it(`should display the starks family by default and switch to the
    Targaryen family once we click on the Targaryen tab`, async () => {
    const starks = ['Sansa Stark', 'Aria Stark', 'Ned Stark'];
    const targaryens = [
      'Daenerys Targaryen',
      'Egon Targaryen',
      'Rhaegar Targaryen'
    ];

    const targaryenTab = fixture.debugElement.queryAll(
      By.css('.mat-tab-label')
    )[1];

    const initialFamilieMemebersElements = fixture.debugElement.queryAll(
      By.css('li')
    );
    const initialFamilieMembers = initialFamilieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(initialFamilieMembers).toEqual(starks);

    targaryenTab.nativeElement.click();

    fixture.detectChanges();
    /*
    await fixture.whenStable();
     */

    const actualFamilieMemebersElements = fixture.debugElement.queryAll(
      By.css('li')
    );
    const actualFamilieMembers = actualFamilieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(actualFamilieMembers).toEqual(targaryens);
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

    const actualFamilieMemebersElements = fixture.debugElement.queryAll(
      By.css('li')
    );
    const actualFamilieMembers = actualFamilieMemebersElements.map(
      (debugElement: DebugElement) => debugElement.nativeElement.innerHTML
    );
    expect(actualFamilieMembers).toEqual(targaryens);
  });
});
