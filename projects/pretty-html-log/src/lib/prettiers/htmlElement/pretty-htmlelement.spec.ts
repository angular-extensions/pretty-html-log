import * as prettyHTMLLog from 'pretty-html-log';
import { THEMES } from 'pretty-html-log';

import * as prettierUtil from '../prettier-util';

import * as htmlElementPrettier from './pretty-htmlelement';
import { prettyPrintHtmlElement } from './pretty-htmlelement';

describe('pretty HTML element', () => {
  it('should call prettyHtmlElement with the htmlElement and pass it to console.log', () => {
    console.log = jest.fn();
    const htmlElement = {
      innerHTML: '<h1>Some mock</h1>'
    } as HTMLElement;
    jest.spyOn(htmlElementPrettier, 'prettyHtmlElement');
    htmlElementPrettier.prettyPrintHtmlElement(
      htmlElement,
      false,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalled();
    expect(htmlElementPrettier.prettyHtmlElement).toHaveBeenCalledWith(
      htmlElement,
      false,
      THEMES.DRACULA
    );
  });

  it(`should call prettyHtmlelement with the htmlElement for each htmlElement. It should then
    pass the returned value to console.log
    for each `, () => {
    console.log = jest.fn();

    const htmlElementOne = {
      innerHTML: '<h1>first mock element</h1>',
      innerText: 'HtmlElementOne'
    } as HTMLElement;
    const htmlElementTwo = {
      innerHTML: '<h1>second mock element</h1>',
      innerText: 'HtmlElementTwo'
    } as HTMLElement;
    const htmlElementThree = {
      innerHTML: '<h1>third mock element</h1>',
      innerText: 'HtmlElementThree'
    } as HTMLElement;

    const htmlElements = [
      htmlElementOne,
      htmlElementTwo,
      htmlElementThree
    ] as HTMLElement[];
    jest.spyOn(htmlElementPrettier, 'prettyHtmlElement');
    htmlElementPrettier.prettyPrintHtmlElements(
      htmlElements,
      false,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(htmlElementPrettier.prettyHtmlElement).toHaveBeenCalledWith(
      htmlElementOne,
      false,
      THEMES.DRACULA
    );
    expect(htmlElementPrettier.prettyHtmlElement).toHaveBeenCalledWith(
      htmlElementTwo,
      false,
      THEMES.DRACULA
    );
    expect(htmlElementPrettier.prettyHtmlElement).toHaveBeenCalledWith(
      htmlElementThree,
      false,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const htmlElement = {
      innerHTML
    } as HTMLElement;
    jest.spyOn(prettyHTMLLog, 'highlight');

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
    jest.spyOn(prettyHTMLLog, 'highlight');
    jest.spyOn(prettierUtil, 'removeComments').mockReturnValue(commentFreeHTML);

    htmlElementPrettier.prettyHtmlElement(htmlElement, false, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      commentFreeHTML,
      THEMES.DRACULA
    );
  });
});
