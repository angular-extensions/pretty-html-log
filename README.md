# @angular-extensions/pretty-html-log

> **Improved debugging of Angular component tests with Jest!**
>
> The @angular-extension/pretty-html-log is a module that makes debugging component tests with Jest a breeze.
> It adds a `phl` method which pretty prints the _innerHTML_ of a `ComponentFixture`, a `DebugElement`, a `NativeElement` or an HTML string.

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/logo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why you should use this module](#why-you-should-use-this-module)
- [Features](#features)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Usage with an import](#usage-with-an-import)
  - [Provide phl as a Jest global](#provide-phl-as-a-jest-global)
- [API](#api)
- [Examples](#examples)
  - [Pass in specific DebugElement](#pass-in-specific-debugelement)
  - [Blog post](#blog-post)
  - [Examples](#examples-1)
  - [Print Angular comments](#print-angular-comments)
  - [Change the theme](#change-the-theme)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why you should use this module

When debugging component tests, it’s often necessary to inspect the DOM. The most common approach to do so is by using the good old `console.log` which has some downsides.

First of all, it’s annoying to always type

```typescript
fixture.debugElement.nativeElement.innerHTML;
```

Moreover, the `console.log` statement doesn’t print the HTML in a very readable way. Therefore we still need to copy the string in a new HTML file and format it to be able to inspect it. Not with **@angular-extensions/pretty-html-log**!

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/before-after.png)

## Features

- Provides a `phl` method that highlights and pretty prints a `fixture`, `debugElement`, `nativeElement` or even a plain HTML string - you don't have to worry how to get to the HTML, just pass the thing you want to print to the `phl` method.
- in case you are using prettier (which you should ;)), pretty-html-log will pick
  up your prettier config and pretty print the HTML string based on your prettier configuration. 🤩

## Getting started

### Installation

This module will only be used during development and can therefore be installed as a dev dependency.

```
npm i -D @angular-extensions/pretty-html-log
```

### Usage with an import

The `@angular-extensions/pretty-html-log` package provides a `phl` method that you can use to pretty print a `fixture`, `debugElement`, `nativeElement` or even a plain HTML string. Simply import it while debugging and pretty print that HTML.

```typescript
import { phl } from '@angular-extensions/pretty-html-log';

describe('my test suite', () => {
  it('should be green', () => {
    phl(fixture); // This will pretty print the fixture
    expect(myTable.getRows()).toBe(5);
  });
});
```

> Note that this way adds a import method. To make sure this import statement gets cleaned up we should configure our eslint to clean up unused imports. More: https://www.npmjs.com/package/eslint-plugin-unused-imports.

### Provide phl as a Jest global

Maybe you don't want to use a plugin that cleans up unused imports or maybe this import statement just annoys you. If that's the case, you have to option to provide the `phl` method as a Jest global. Similar to `it`, `describe` or `expect`.

1. rename you jest config from `jest.config.js` to `jest.config.mjs`. Using the `.mjs` extension allows us to use ES Modules inside our Jest config. Jest officially supports `.mjs` configuration files.

2. Import `phl` from `@angular-extensions/pretty-html-log` and provide it as a global inside your `jest.config.mjs`:

   ```javascript
   import {phl} from "@angular-extensions/pretty-html-log";

   module.exports = {
     globals: {
       phl
     }
   };
   ```

3. Import `@angular-extensions/pretty-html-log` inside your jest.setup.ts

   ```typescript
   import 'jest-preset-angular/setup-jest';
   import '@angular-extensions/pretty-html-log';
   ```

4. Start using it inside your tests without the usage of import 🤩

   ```typescript
   describe('my test suite', () => {
     it('should be green', () => {
       phl(fixture); // This will pretty print the fixture
       expect(myTable.getRows()).toBe(5);
     });
   });
   ```

## API

The `phl` method has the following signature:

```typescript
<T>(
  ngHTMLElement: NgHTMLElement<T>,
  enableComments = false,
  theme = THEMES.DRACULA
)
```

| Property                        | Description                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ngHTMLElement<T>                | Value to extract the html from and pretty print it to the console: ComponentFixture                                | DebugElement | DebugElement[] | HTMLElement | HTMLElement[] | string; |
| enableComments (default: false) | When set to true we print the generated comments by Angular. For example: <!--bindings={"ng-reflect-ng-for-of":... |
| theme: (default: DRACULA)       | pretty-html-log themes (DRACULA, VSCODE and MATERIAL)                                                              |

## Examples

### Pass in specific DebugElement

In your test you can simply write the following line.

```typescript
phl(fixture.debugElement.query(By.css('mat-tab-body')));
```

Which will print the following string to your console. Depending on your test configuration you
might run into an issue with the patch of the console. In such cases its best to report an [issue](https://github.com/angular-extensions/pretty-html-log/issues) and use the `logNgHTML` function directly.

```typescript
phl(fixture.debugElement.query(By.css('mat-tab-body')));
```

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/output.png)

### Blog post

[Improved debugging of Angular component tests in Jest](https://medium.com/angular-in-depth/improved-debugging-of-angular-component-tests-in-jest-ac035e521763) is a write up on AngularInDepth that shows how `@angular-extensions/pretty-html-log` is used and set up in a project.

### Examples

Log the content innerHTML of a fixture

```typescript
phl(fixture);
```

of a debugElement (or multiple debugElements)

```typescript
phl(fixture.debugElement);
```

of a nativeElement (or multiple nativeElements)

```typescript
phl(fixture.debugElement.nativeElement);
```

or even a simple HTML string

```typescript
phl('<h1>Foo</h1>');
```

### Print Angular comments

Angular adds some comments to our HTML file. Usually, when debugging our tests, we don't need them. Therefore they
are not printed by default. However, there are cases where you want to print those comments. To do so, you
can pass `true` as an additional flag tot he `logNgHTML` method.

```typescript
phl(fixture, true);
```

### Change the theme

`@angular-extensions/pretty-html-log` allows you to print the html logs in different themes.
Currently, we support (DRACULA, VSCODE and MATERIAL). The themes can be importet from `pretty-html-log`, the base library `@angular-extensions/pretty-html-log` depends on.

```typescript
import { THEMES } from 'pretty-html-log';

console.logNgHTML(fixture, false, THEMES.VSCODE);
```
