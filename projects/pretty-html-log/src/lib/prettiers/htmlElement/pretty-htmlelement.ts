import { Theme } from 'pretty-html-log';
import { highlight } from 'pretty-html-log';
import { removeComments } from '../prettier-util';

export const prettyPrintHtmlElement = (
  htmlElement: HTMLElement,
  enableComments: boolean,
  theme?: Theme
): void => {
  console.log(prettyHtmlElement(htmlElement, enableComments, theme));
};

export const prettyPrintHtmlElements = (
  htmlElements: HTMLElement[],
  enableComments: boolean,
  theme?: Theme
): void => {
  for (let i = 0; i < htmlElements.length; i++) {
    console.log(`--------- HTMLElement ${i} -----------
        ${prettyHtmlElement(htmlElements[i], enableComments, theme)}
    `);
  }
};

export const prettyHtmlElement = (
  htmlElement: HTMLElement,
  enableComments: boolean,
  theme: Theme
): string => {
  return highlight(
    enableComments
      ? htmlElement.innerHTML
      : removeComments(htmlElement.innerHTML),
    theme
  );
};
