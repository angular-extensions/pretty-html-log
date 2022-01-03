import { Theme } from 'pretty-html-log';

declare global {
  const phl: <T>(
    ngHTMLElement: any,
    enableComments?: boolean,
    theme?: Theme
  ) => string;
}
