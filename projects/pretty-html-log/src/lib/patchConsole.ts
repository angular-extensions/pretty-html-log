import { Theme } from 'pretty-html-log';
import { logNgHTML } from './logNgHTML';

(() => {
  (console as any).logNgHTML = logNgHTML;
})();

declare global {
  interface Console {
    logNgHTML: <T>(
      ngHTMLElement: any,
      enableComments?: boolean,
      theme?: Theme
    ) => void;
  }
}
