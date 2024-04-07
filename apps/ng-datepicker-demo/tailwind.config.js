const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'libs/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        dpprimary: colors.blue,
        dpsecondary: colors.slate
      }
    }
  },
  plugins: [],
};
