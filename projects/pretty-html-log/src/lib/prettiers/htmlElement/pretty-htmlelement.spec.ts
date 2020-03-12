import * as prettyHTMLLog from 'pretty-html-log';
import { THEMES } from 'pretty-html-log';

import * as prettierUtil from '../prettier-util';

import * as htmlElementPrettier from './pretty-htmlelement';
import { prettyPrintHtmlElement } from './pretty-htmlelement';

describe('pretty HTML element', () => {
  it('should call prettyHtmlElement with the htmlElement and pass it to console.log', () => {
    console.log = jest.fn();
    const htmlElement = {} as HTMLElement;
    spyOn(htmlElementPrettier, 'prettyHtmlElement');
    htmlElementPrettier.prettyPrintHtmlElement(
      htmlElement,
      false,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintHtmlElement(htmlElement, false, THEMES.DRACULA)
    );
  });

  it(`should call prettyHtmlelement with the htmlElement for each htmlElement. It should then
    pass the returned value to console.log
    for each `, () => {
    console.log = jest.fn();

    const htmlElementOne = { innerText: 'HtmlElementOne' } as HTMLElement;
    const htmlElementTwo = { innerText: 'HtmlElementTwo' } as HTMLElement;
    const htmlElementThree = { innerText: 'HtmlElementThree' } as HTMLElement;

    const htmlElements = [
      htmlElementOne,
      htmlElementTwo,
      htmlElementThree
    ] as HTMLElement[];
    spyOn(htmlElementPrettier, 'prettyHtmlElement');
    htmlElementPrettier.prettyPrintHtmlElements(
      htmlElements,
      false,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintHtmlElement(htmlElementOne, false, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintHtmlElement(htmlElementTwo, false, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintHtmlElement(htmlElementThree, false, THEMES.DRACULA)
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const htmlElement = {
      innerHTML
    } as HTMLElement;
    spyOn(prettyHTMLLog, 'highlight');

    htmlElementPrettier.prettyHtmlElement(htmlElement, true, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      innerHTML,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1><!--Some comment-->';
    const commentFreeHTML = '<h1>Foo</h1>';
    const htmlElement = {
      innerHTML
    } as HTMLElement;
    spyOn(prettyHTMLLog, 'highlight');
    spyOn(prettierUtil, 'removeComments').and.returnValue(commentFreeHTML);

    htmlElementPrettier.prettyHtmlElement(htmlElement, false, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      commentFreeHTML,
      THEMES.DRACULA
    );
  });
});
