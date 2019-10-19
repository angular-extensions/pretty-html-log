import { ComponentFixture } from '@angular/core/testing';
import { highlight, Theme } from 'pretty-html-log';
import { DebugElement } from '@angular/core';

export const prettyPrintDebugElement = (
  debugElement: DebugElement,
  theme?: Theme
): void => {
  console.log(prettyDebugelement(debugElement, theme));
};

export const prettyPrintDebugElements = (
  debugElements: DebugElement[],
  theme?: Theme
): void => {
  for (let i = 0; i < debugElements.length; i++) {
    console.log(`--------- Degubelement ${i} -----------
        ${prettyDebugelement(debugElements[i], theme)}
    `);
  }
};

export const prettyDebugelement = (
  debugElement: DebugElement,
  theme?: Theme
): string => {
  return highlight(debugElement.nativeElement.innerHTML, theme);
};
