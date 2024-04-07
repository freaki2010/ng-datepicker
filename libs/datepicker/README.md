# Angular datepicker

## Setup

Add tailwindcss to your angular project: https://tailwindcss.com/docs/guides/angular.

tailwind.config.js

```js
  const colors = require('tailwindcss/colors')

  module.exports = {
    ...
    content: [
      ...
      "./node_modules/@yatafu/datepicker/**/!(*.stories|*.spec)"
    ],
    theme: {
      ...
      extend: {
        ...
        colors: {
          dpprimary: colors.blue,
          dpsecondary: colors.slate
        },
      }
    }
  }
```

## Usage

Add the component to your module:

```ts
  imports: [
    ...
    DatepickerTailwindComponent,
    ...
  ],
```

For usage in html:

```html
<yatafu-datepicker-tailwind
  [value]="date"
  [disableFutureDays]="true"
  formInputId="to"
  formInputLabel="Bis"
></yatafu-datepicker-tailwind>
```
