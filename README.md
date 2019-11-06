# @angular-extensions/pretty-html-log

![logNgHTML](https://raw.githubusercontent.com/angular-extensions/pretty-html-log/master/images/logo.png)

This module allows you to pretty print the inner HTML
of `ComponentFixtures`,
`DebugElements`, `NativeElements` or even plain HTML `strings` to the console.

## Getting started

This module will only be used during development and can therefore
be installed as a dev dependency.

```
npm i -D @angular-extensions/pretty-html-log
```

This module is best used with Angular and Jest. Create a
`setupJest.ts` file in your `src` directory and import
`@angular-extension/pretty-html-log`.

This import adds a `logNgHTML` method to your console. You can then
use this method during tests to pretty print `ComponentFixtures`,
`DebugElements`, `NativeElements` or even plain HTML `strings` .

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

### Further examples

Instead of passing in a DebugElement you can also pass in a fixture:

```
console.logNgHTML(fixture);
```

or a nativeElement

```
console.logNgHTML(fixture.debugElement.nativeElement);
```

or even a simple HTML string

```
console.logNgHTML('<h1>Foo</h1>');
```
