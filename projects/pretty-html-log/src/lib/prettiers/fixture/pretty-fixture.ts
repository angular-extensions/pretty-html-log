import { ComponentFixture } from '@angular/core/testing';
import { highlight, Theme } from 'pretty-html-log';
import { removeComments } from '../prettier-util';

export const fixturePrettier = <T>(
  fixture: ComponentFixture<T>,
  enableComments: boolean,
  theme: Theme
): void => {
  console.log(prettyFixture(fixture, enableComments, theme));
};

export const prettyFixture = <T>(
  fixture: ComponentFixture<T>,
  enableComments: boolean,
  theme: Theme
): string => {
  const innerHTML = fixture.debugElement.nativeElement.innerHTML;
  return highlight(
    enableComments ? innerHTML : removeComments(innerHTML),
    theme
  );
};
