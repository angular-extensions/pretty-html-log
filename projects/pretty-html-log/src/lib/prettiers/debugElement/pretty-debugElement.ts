import { highlight, Theme } from 'pretty-html-log';
import { DebugElement } from '@angular/core';
import { removeComments } from '../prettier-util';

export const prettyPrintDebugElement = (
  debugElement: DebugElement,
  enableComments: boolean,
  theme?: Theme
): void => {
  console.log(prettyDebugelement(debugElement, enableComments, theme));
};

export const prettyPrintDebugElements = (
  debugElements: DebugElement[],
  enableComments: boolean,
  theme?: Theme
): void => {
  for (let i = 0; i < debugElements.length; i++) {
    console.log(`--------- Degubelement ${i} -----------
        ${prettyDebugelement(debugElements[i], enableComments, theme)}
    `);
  }
};

export const prettyDebugelement = (
  debugElement: DebugElement,
  enableComments: boolean,
  theme?: Theme
): string => {
  const innerHTML = debugElement.nativeElement.innerHTML;
  return highlight(
    enableComments ? innerHTML : removeComments(innerHTML),
    theme
  );
};
