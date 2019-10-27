import { Theme } from 'pretty-html-log';
import { highlight } from 'pretty-html-log';

export const prettyPrintHtmlElement = (
  htmlElement: HTMLElement,
  theme?: Theme
): void => {
  console.log(prettyHtmlElement(htmlElement, theme));
};

export const prettyPrintHtmlElements = (
  htmlElements: HTMLElement[],
  theme?: Theme
): void => {
  for (let i = 0; i < htmlElements.length; i++) {
    console.log(`--------- HTMLElement ${i} -----------
        ${prettyHtmlElement(htmlElements[i], theme)}
    `);
  }
};

export const prettyHtmlElement = (
  htmlElement: HTMLElement,
  theme?: Theme
): string => {
  return highlight(htmlElement.innerHTML, theme);
};
