import * as prettyFixture from './pretty-fixture';
import { prettyPrintFixture } from './pretty-fixture';
import { DebugElement } from '@angular/core';
import * as prettyHTMLLog from 'pretty-html-log';
import { THEMES } from 'pretty-html-log';
import { ComponentFixture } from '@angular/core/testing';

describe('pretty fixture', () => {
  it('should call prettyFixture with the componentFixture and pass it to console.log', () => {
    console.log = jest.fn();
    const componentFixture = {} as ComponentFixture<any>;
    spyOn(prettyFixture, 'prettyFixture');
    prettyFixture.prettyPrintFixture(componentFixture, THEMES.DRACULA);

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintFixture(componentFixture, THEMES.DRACULA)
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
    spyOn(prettyHTMLLog, 'highlight');

    prettyFixture.prettyFixture(componentFixture, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      innerHTML,
      THEMES.DRACULA
    );
  });
});
