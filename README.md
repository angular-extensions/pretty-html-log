# @angular-extensions/pretty-html-log

> Improved debugging of Angular component tests.
> The @angular-extension/pretty-html-log is a module that makes debugging component tests with Jest a breeze.
> It adds a console.logNgHTML method which pretty prints the innerHTML of a ComponentFixture, a DebugElement, a NativeElement or an HTML string.

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/logo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why you should use this module](#why-you-should-use-this-module)
- [Features](#features)
- [Getting started](#getting-started)
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
First of all, it’s annoying always to type

```
fixture.debugElement.nativeElement.innerHTML
```

Moreover, the console.log statement doesn’t print the HTML in a very readable way. Therefore we still need to copy the string in a new HTML file and format it to be able to inspect it. Not with `@angular-extensions/pretty-html-log`

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/before-after.png)

## Features

- patches the console and adds a new method `console.logNgHTML`
- pretty prints a fixture, debugElement, nativeElement or plain HTML string - you don't have to worry
  how to get to the HTML, just pass the thing you want to print to the `console.logNgHTML` method.
- highlights the HTML
- in case you are using prettier (which you should ;)), pretty-html-log will pick
  up your prettier config and pretty print the HTML string based on your prettier configuration. 🤩

## Getting started

This module will only be used during development and can therefore
be installed as a dev dependency.

```
npm i -D @angular-extensions/pretty-html-log
```

This module is best used with Angular and Jest. Create a
`setupJest.ts` file in your `src` directory and add the following line **after your jest-preset-angular import. ⚠️ The order can matter**:

```
import '@angular-extensions/pretty-html-log'
```

This import adds a `logNgHTML` method to your console. You can then
use this method during tests to pretty print `ComponentFixtures`,
`DebugElements`, `NativeElements` or even plain HTML `strings` .

## API

The `console.logNgHTML()` method has the following signature:

```
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

```
console.logNgHTML(
    fixture.debugElement.query(By.css('mat-tab-body'))
)
```

Which will print the following string to your console

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/output.png)

### Blog post

[Improved debugging of Angular component tests in Jest](https://medium.com/angular-in-depth/improved-debugging-of-angular-component-tests-in-jest-ac035e521763) is a write up on AngularInDepth that shows how `@angular-extensions/pretty-html-log` is used and set up in a project.

### Examples

Log the content innerHTML of a fixture

```
console.logNgHTML(fixture);
```

of a debugElement (or multiple debugElements)

```
console.logNgHTML(fixture.debugElement);
```

of a nativeElement (or multiple nativeElements)

```
console.logNgHTML(fixture.debugElement.nativeElement);
```

or even a simple HTML string

```
console.logNgHTML('<h1>Foo</h1>');
```

### Print Angular comments

Angular adds some comments to our HTML file. Usually, when debugging our tests, we don't need them. Therefore they
are not printed by default. However, there are cases where you want to print those comments. To do so, you
can pass `true` as an additional flag tot he `logNgHTML` method.

```
console.logNgHTML(fixture, true);
```

### Change the theme

`@angular-extensions/pretty-html-log` allows you to print the html logs in different themes.
Currently, we support (DRACULA, VSCODE and MATERIAL). The themes can be importet from `pretty-html-log`, the
base library `@angular-extensions/pretty-html-log` depends on.

```
import {THEMES} from 'pretty-html-log';

console.logNgHTML(fixture, false, THEMES.VSCODE);
```
