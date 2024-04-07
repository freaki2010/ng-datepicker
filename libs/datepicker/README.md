# Angular datepicker

## Setup

Add tailwindcss to your angular project: https://tailwindcss.com/docs/guides/angular.

tailwind.config.js

```js
  module.exports = {
    ...,
    content: [
      ...
      "./node_modules/@yatafu/datepicker/**/!(*.stories|*.spec)"
    ],
    ...
  }
```

## Usage

Add the component to your moduls:

```ts
  imports: [
    ...
    DatepickerTailwindComponent,
    ...
  ],
```

For usage in html:

```html
<yatafu-datepicker-tailwind [(value)]="currDay" [disableFutureDays]="true|false" id="to" label="Bis"></yatafu-datepicker-tailwind>
```
