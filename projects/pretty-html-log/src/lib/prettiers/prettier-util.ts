export const removeComments = (htmlString: string): string =>
  htmlString.replace(/<!--[\s\S]*?-->/g, '');
