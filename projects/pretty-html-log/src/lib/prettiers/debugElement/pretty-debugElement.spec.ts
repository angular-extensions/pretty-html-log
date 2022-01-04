import { DebugElement } from '@angular/core';
import { THEMES } from 'pretty-html-log';
import * as prettyHTMLLog from 'pretty-html-log';

import * as prettierUtil from '../prettier-util';

import * as debugElementPrettier from './pretty-debugElement';
import { prettyPrintDebugElement } from './pretty-debugElement';

describe('pretty debug element', () => {
  it('should call prettyDebugelement with the debugElement and pass it to console.log', () => {
    console.log = jest.fn();
    const debugElement = {
      nativeElement: {
        innerHTML: '<h1>Mock element</h1>'
      }
    } as DebugElement;
    jest.spyOn(debugElementPrettier, 'prettyDebugelement');
    debugElementPrettier.prettyPrintDebugElement(
      debugElement,
      true,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalled();
    expect(debugElementPrettier.prettyDebugelement).toHaveBeenCalledWith(
      debugElement,
      true,
      THEMES.DRACULA
    );
  });

  it(`should call prettyDebugelement with the debugElement for each debugElement. It should then
    pass the returned value to console.log
    for each `, () => {
    console.log = jest.fn();

    const debugElementOne = {
      name: 'DebugElementOne',
      nativeElement: {
        innerHTML: '<h1>first mock element</h1>'
      }
    } as DebugElement;
    const debugElementTwo = {
      name: 'DebugElementTwo',
      nativeElement: {
        innerHTML: '<h1>second mock element</h1>'
      }
    } as DebugElement;
    const debugElementThree = {
      name: 'DebugElementThree',
      nativeElement: {
        innerHTML: '<h1>third mock element</h1>'
      }
    } as DebugElement;

    const debugElements = [
      debugElementOne,
      debugElementTwo,
      debugElementThree
    ] as DebugElement[];
    jest.spyOn(debugElementPrettier, 'prettyDebugelement');
    debugElementPrettier.prettyPrintDebugElements(
      debugElements,
      true,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledTimes(3);
    expect(debugElementPrettier.prettyDebugelement).toHaveBeenCalledWith(
      debugElementOne,
      true,
      THEMES.DRACULA
    );
    expect(debugElementPrettier.prettyDebugelement).toHaveBeenCalledWith(
      debugElementTwo,
      true,
      THEMES.DRACULA
    );
    expect(debugElementPrettier.prettyDebugelement).toHaveBeenCalledWith(
      debugElementThree,
      true,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const debugElement = {
      nativeElement: {
        innerHTML
      }
    } as DebugElement;
    jest.spyOn(prettyHTMLLog, 'highlight');

    debugElementPrettier.prettyDebugelement(debugElement, true, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      innerHTML,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the innerHTML without comments', () => {
    const innerHTML = '<h1>Foo</h1><!--Some comment-->';
    const commentFreeHTML = '<h1>Foo</h1>';
    const debugElement = {
      nativeElement: {
        innerHTML
      }
    } as DebugElement;
    jest.spyOn(prettyHTMLLog, 'highlight');
    jest.spyOn(prettierUtil, 'removeComments').mockReturnValue(commentFreeHTML);

    debugElementPrettier.prettyDebugelement(
      debugElement,
      false,
      THEMES.DRACULA
    );
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      commentFreeHTML,
      THEMES.DRACULA
    );
  });
});
