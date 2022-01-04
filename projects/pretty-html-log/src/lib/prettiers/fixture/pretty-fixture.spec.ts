import { ComponentFixture } from '@angular/core/testing';
import { THEMES } from 'pretty-html-log';
import * as prettyHTMLLog from 'pretty-html-log';

import * as prettierUtil from '../prettier-util';

import * as prettyFixture from './pretty-fixture';
import { fixturePrettier } from './pretty-fixture';

describe('pretty fixture', () => {
  it('should call prettyFixture with the componentFixture and pass it to console.log', () => {
    console.log = jest.fn();
    const componentFixture = {
      debugElement: {
        nativeElement: {
          innerHTML: '<h1>some mock element</h1>'
        }
      }
    } as ComponentFixture<any>;
    jest.spyOn(prettyFixture, 'prettyFixture');
    prettyFixture.fixturePrettier(componentFixture, false, THEMES.DRACULA);

    expect(console.log).toHaveBeenCalled();
    expect(prettyFixture.prettyFixture).toHaveBeenCalledWith(
      componentFixture,
      false,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const componentFixture = {
      debugElement: {
        nativeElement: {
          innerHTML
        }
      }
    } as ComponentFixture<any>;
    jest.spyOn(prettyHTMLLog, 'highlight');

    prettyFixture.prettyFixture(componentFixture, true, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      innerHTML,
      THEMES.DRACULA
    );
  });

  it('should call the highlight method with the comment free HTML', () => {
    const innerHTML = '<h1>Foo</h1><!--Some comment-->';
    const commentFreeHTML = '<h1>Foo</h1>';
    const componentFixture = {
      debugElement: {
        nativeElement: {
          innerHTML
        }
      }
    } as ComponentFixture<any>;
    jest.spyOn(prettyHTMLLog, 'highlight');
    jest.spyOn(prettierUtil, 'removeComments').mockReturnValue(commentFreeHTML);

    prettyFixture.prettyFixture(componentFixture, false, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      commentFreeHTML,
      THEMES.DRACULA
    );
  });
});
