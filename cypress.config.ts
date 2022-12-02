import { defineConfig } from 'cypress';
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { downloadFile });
    },
    baseUrl: 'http://localhost:3333',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
