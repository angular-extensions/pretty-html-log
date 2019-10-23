import { ComponentFixture } from '@angular/core/testing';
import { highlight, Theme } from 'pretty-html-log';

export const prettyPrintFixture = <T>(
  fixture: ComponentFixture<T>,
  theme?: Theme
): void => {
  console.log(prettyFixture(fixture, theme));
};

export const prettyFixture = <T>(
  fixture: ComponentFixture<T>,
  theme?: Theme
): string => {
  return highlight(fixture.debugElement.nativeElement.innerHTML, theme);
};
