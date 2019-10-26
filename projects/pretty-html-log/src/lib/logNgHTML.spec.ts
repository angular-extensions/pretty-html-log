import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as prettyHTMLLog from 'pretty-html-log';
import { highlight, THEMES } from 'pretty-html-log';

import { logNgHTML } from './logNgHTML';
import * as fixturePrettier from './prettiers/fixture/pretty-fixture';
import * as debugElementPrettier from './prettiers/debugElement/pretty-debugElement';
import * as htmlElementPrettier from './prettiers/htmlElement/pretty-htmlelement';

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

describe('LogNgHTML', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  const theme = THEMES.DRACULA;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call prettyPrintFixture incase we provide a component fixture', () => {
    spyOn(fixturePrettier, 'fixturePrettier');
    logNgHTML<MockComponent>(fixture, theme);
    expect(fixturePrettier.fixturePrettier).toHaveBeenCalledWith(
      fixture,
      theme
    );
  });

  it('should call prettyPrintDebugElements in case we provide an array of DebugElements', () => {
    spyOn(console, 'log');
    spyOn(debugElementPrettier, 'prettyPrintDebugElements');
    const debugElements = fixture.debugElement.queryAll(By.css('li'));
    logNgHTML(debugElements, theme);
    expect(debugElementPrettier.prettyPrintDebugElements).toHaveBeenCalledWith(
      debugElements,
      theme
    );
  });

  it('should call prettyPrintHTMLElements in case we provide an array of HTMLelements', () => {
    spyOn(console, 'log');
    spyOn(htmlElementPrettier, 'prettyPrintHtmlElements');
    const htmlElements = fixture.debugElement
      .queryAll(By.css('li'))
      .map((debugElement: DebugElement) => debugElement.nativeElement);
    logNgHTML(htmlElements, theme);
    expect(htmlElementPrettier.prettyPrintHtmlElements).toHaveBeenCalledWith(
      htmlElements,
      theme
    );
  });

  it('should call prettyPrintDebugElement in case we provide a debug element', () => {
    spyOn(debugElementPrettier, 'prettyPrintDebugElement');
    const debugElement = fixture.debugElement.queryAll(By.css('li'))[0];
    logNgHTML(debugElement, theme);
    expect(debugElementPrettier.prettyPrintDebugElement).toHaveBeenCalledWith(
      debugElement,
      theme
    );
  });

  it('should call prettyPrintHTMLElement in case we provide a HTMLelement', () => {
    spyOn(htmlElementPrettier, 'prettyPrintHtmlElement');
    const htmlElement = fixture.debugElement.queryAll(By.css('li'))[0]
      .nativeElement;
    logNgHTML(htmlElement, theme);
    expect(htmlElementPrettier.prettyPrintHtmlElement).toHaveBeenCalledWith(
      htmlElement,
      theme
    );
  });

  it('should print a warning if we pass in an unknown type', () => {
    spyOn(console, 'log');
    spyOn(prettyHTMLLog, 'highlight');
    const htmlString = '<h1>Foo</h1>';
    logNgHTML(htmlString, theme);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(htmlString, theme);
  });
});