import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { highlight, Theme, THEMES } from 'pretty-html-log';

import { fixturePrettier } from './prettiers/fixture/pretty-fixture';
import {
  prettyPrintDebugElement,
  prettyPrintDebugElements
} from './prettiers/debugElement/pretty-debugElement';
import {
  prettyPrintHtmlElement,
  prettyPrintHtmlElements
} from './prettiers/htmlElement/pretty-htmlelement';
import { removeComments } from './prettiers/prettier-util';

export type NgHTMLElement<T> =
  | ComponentFixture<T>
  | DebugElement
  | DebugElement[]
  | HTMLElement
  | HTMLElement[]
  | string;

export const phl = <T>(
  ngHTMLElement: NgHTMLElement<T>,
  enableComments = false,
  theme = THEMES.DRACULA
) => {
  if (ngHTMLElement instanceof ComponentFixture) {
    fixturePrettier<T>(ngHTMLElement, enableComments, theme);
    return;
  }

  if (Array.isArray(ngHTMLElement)) {
    if (ngHTMLElement[0] instanceof DebugElement) {
      prettyPrintDebugElements(
        ngHTMLElement as DebugElement[],
        enableComments,
        theme
      );
      return;
    }

    if (ngHTMLElement[0] instanceof HTMLElement) {
      prettyPrintHtmlElements(
        ngHTMLElement as HTMLElement[],
        enableComments,
        theme
      );
      return;
    }
  }

  if (ngHTMLElement instanceof DebugElement) {
    prettyPrintDebugElement(ngHTMLElement, enableComments, theme);
    return;
  }

  if (ngHTMLElement instanceof HTMLElement) {
    prettyPrintHtmlElement(ngHTMLElement, enableComments, theme);
    return;
  }
  console.log(
    highlight(
      enableComments
        ? (ngHTMLElement as string)
        : removeComments(ngHTMLElement as string),
      theme
    )
  );
};
