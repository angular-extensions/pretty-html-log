import { ComponentFixture } from '@angular/core/testing';
import { Theme } from 'pretty-html-log';
import { logNgHTML, NgHTMLElement } from './logNgHTML';

(() => {
  (console as any).logNgHTML = logNgHTML;
})();

declare global {
  interface Console {
    logNgHTML: <T>(ngHTMLElement: any, theme?: Theme) => void;
  }
}
