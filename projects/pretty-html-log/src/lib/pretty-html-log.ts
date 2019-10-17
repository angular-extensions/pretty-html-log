import { highlight } from 'pretty-html-log';
import { Theme } from 'pretty-html-log';
import { ComponentFixture } from '@angular/core/testing';

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

(() => {
  (console as any).logFixture = prettyPrintFixture;
})();

declare global {
  interface Console {
    logFixture: <T>(fixture: ComponentFixture<T>, theme?: Theme) => void;
  }
}
