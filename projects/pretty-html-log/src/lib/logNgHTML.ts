import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { highlight, Theme } from 'pretty-html-log';
import { prettyPrintFixture } from './prettiers/fixture/pretty-fixture';
import {
  prettyPrintDebugElement,
  prettyPrintDebugElements
} from './prettiers/debugElement/pretty-debugElement';
import {
  prettyPrintHtmlElement,
  prettyPrintHtmlElements
} from './prettiers/htmlElement/pretty-htmlelement';

export type NgHTMLElement<T> =
  | ComponentFixture<T>
  | DebugElement
  | DebugElement[]
  | HTMLElement
  | HTMLElement[]
  | string;

export const logNgHTML = <T>(
  ngHTMLElement: NgHTMLElement<T>,
  theme?: Theme
) => {
  if (ngHTMLElement instanceof ComponentFixture) {
    prettyPrintFixture<T>(ngHTMLElement, theme);
    return;
  }

  if (Array.isArray(ngHTMLElement)) {
    if (ngHTMLElement[0] instanceof DebugElement) {
      prettyPrintDebugElements(ngHTMLElement as DebugElement[], theme);
      return;
    }

    if (ngHTMLElement[0] instanceof HTMLElement) {
      prettyPrintHtmlElements(ngHTMLElement as HTMLElement[], theme);
      return;
    }
  }

  if (ngHTMLElement instanceof DebugElement) {
    prettyPrintDebugElement(ngHTMLElement, theme);
    return;
  }

  if (ngHTMLElement instanceof HTMLElement) {
    prettyPrintHtmlElement(ngHTMLElement, theme);
    return;
  }
  console.log(highlight(ngHTMLElement as any, theme));
};
