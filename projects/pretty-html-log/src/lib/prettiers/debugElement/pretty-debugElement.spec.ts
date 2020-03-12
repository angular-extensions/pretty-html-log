import { DebugElement } from '@angular/core';
import { THEMES } from 'pretty-html-log';
import * as prettyHTMLLog from 'pretty-html-log';

import * as prettierUtil from '../prettier-util';

import * as debugElementPrettier from './pretty-debugElement';
import { prettyPrintDebugElement } from './pretty-debugElement';

describe('pretty debug element', () => {
  it('should call prettyDebugelement with the debugElement and pass it to console.log', () => {
    console.log = jest.fn();
    const debugElement = {} as DebugElement;
    spyOn(debugElementPrettier, 'prettyDebugelement');
    debugElementPrettier.prettyPrintDebugElement(
      debugElement,
      true,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElement, true, THEMES.DRACULA)
    );
  });

  it(`should call prettyDebugelement with the debugElement for each debugElement. It should then
    pass the returned value to console.log
    for each `, () => {
    console.log = jest.fn();

    const debugElementOne = { name: 'DebugElementOne' } as DebugElement;
    const debugElementTwo = { name: 'DebugElementTwo' } as DebugElement;
    const debugElementThree = { name: 'DebugElementThree' } as DebugElement;

    const debugElements = [
      debugElementOne,
      debugElementTwo,
      debugElementThree
    ] as DebugElement[];
    spyOn(debugElementPrettier, 'prettyDebugelement');
    debugElementPrettier.prettyPrintDebugElements(
      debugElements,
      true,
      THEMES.DRACULA
    );

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementOne, true, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementTwo, true, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementThree, true, THEMES.DRACULA)
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const debugElement = {
      nativeElement: {
        innerHTML
      }
    } as DebugElement;
    spyOn(prettyHTMLLog, 'highlight');

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
    spyOn(prettyHTMLLog, 'highlight');
    spyOn(prettierUtil, 'removeComments').and.returnValue(commentFreeHTML);

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
