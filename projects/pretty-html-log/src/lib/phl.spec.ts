import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as prettyHTMLLog from 'pretty-html-log';
import { THEMES } from 'pretty-html-log';

import { phl } from './phl';
import * as fixturePrettier from './prettiers/fixture/pretty-fixture';
import * as debugElementPrettier from './prettiers/debugElement/pretty-debugElement';
import * as htmlElementPrettier from './prettiers/htmlElement/pretty-htmlelement';
import * as prettierUtil from './prettiers/prettier-util';

@Component({
  selector: 'lib-mock-component',
  template: `
    <ul>
      <li>Foo</li>
      <li>Bar</li>
      <li>Baz</li>
    </ul>
  `
})
export class MockComponent {}

describe('phl', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  const theme = THEMES.DRACULA;
  const enableComments = true;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MockComponent],
        teardown: { destroyAfterEach: false }
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call prettyPrintFixture incase we provide a component fixture', () => {
    jest.spyOn(fixturePrettier, 'fixturePrettier');
    phl<MockComponent>(fixture, enableComments, theme);
    expect(fixturePrettier.fixturePrettier).toHaveBeenCalledWith(
      fixture,
      enableComments,
      theme
    );
  });

  it('should call prettyPrintDebugElements in case we provide an array of DebugElements', () => {
    jest.spyOn(console, 'log');
    jest.spyOn(debugElementPrettier, 'prettyPrintDebugElements');
    const debugElements = fixture.debugElement.queryAll(By.css('li'));
    phl(debugElements, enableComments, theme);
    expect(debugElementPrettier.prettyPrintDebugElements).toHaveBeenCalledWith(
      debugElements,
      enableComments,
      theme
    );
  });

  it('should call prettyPrintHTMLElements in case we provide an array of HTMLelements', () => {
    jest.spyOn(console, 'log');
    jest.spyOn(htmlElementPrettier, 'prettyPrintHtmlElements');
    const htmlElements = fixture.debugElement
      .queryAll(By.css('li'))
      .map((debugElement: DebugElement) => debugElement.nativeElement);
    phl(htmlElements, enableComments, theme);
    expect(htmlElementPrettier.prettyPrintHtmlElements).toHaveBeenCalledWith(
      htmlElements,
      enableComments,
      theme
    );
  });

  it('should call prettyPrintDebugElement in case we provide a debug element', () => {
    jest.spyOn(debugElementPrettier, 'prettyPrintDebugElement');
    const debugElement = fixture.debugElement.queryAll(By.css('li'))[0];
    phl(debugElement, enableComments, theme);
    expect(debugElementPrettier.prettyPrintDebugElement).toHaveBeenCalledWith(
      debugElement,
      enableComments,
      theme
    );
  });

  it('should call prettyPrintHTMLElement in case we provide a HTMLelement', () => {
    jest.spyOn(htmlElementPrettier, 'prettyPrintHtmlElement');
    const htmlElement = fixture.debugElement.queryAll(By.css('li'))[0]
      .nativeElement;
    phl(htmlElement, enableComments, theme);
    expect(htmlElementPrettier.prettyPrintHtmlElement).toHaveBeenCalledWith(
      htmlElement,
      enableComments,
      theme
    );
  });

  it('should print a warning if we pass in an unknown type', () => {
    jest.spyOn(console, 'log');
    jest.spyOn(prettyHTMLLog, 'highlight');
    const htmlString = '<h1>Foo</h1>';
    phl(htmlString, enableComments, theme);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(htmlString, theme);
  });

  it('should print a warning and remove the comments we pass in an unknown type and enableComments', () => {
    const htmlString = '<h1>Foo</h1><!--Some comment-->';
    const commentFreeHTMLString = '<h1>Foo</h1>';
    jest.spyOn(console, 'log');
    jest.spyOn(prettyHTMLLog, 'highlight');
    jest
      .spyOn(prettierUtil, 'removeComments')
      .mockReturnValue(commentFreeHTMLString);
    phl(htmlString, false, theme);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      commentFreeHTMLString,
      theme
    );
  });
});
