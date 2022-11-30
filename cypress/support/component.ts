// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '../../src/assets/scss/index.scss';
import 'animate.css';

import { mount } from 'cypress/vue';
import { createWebHashHistory, createRouter, Router } from 'vue-router';
import { createPinia, Pinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faThumbsUp, faCircleRight } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faCircleNotch,
  faXmark,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { routes } from '../../src/router';

library.add(faBell);
library.add(faThumbsUp);
library.add(faMagnifyingGlass);
library.add(faCircleRight);
library.add(faCircleNotch);
library.add(faXmark);
library.add(faTrashCan);

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1] & { router?: Router };

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: any, options?: OptionsParam & { createPinia?: Pinia }): Chainable<any>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {};
  options.global.components = options.global.components || {};
  options.global.plugins = options.global.plugins || [];

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      routes: routes,
      history: createWebHashHistory(),
    });
  }

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      if (options.router) {
        app.use(options.router);
      }

      app.use(createPinia());
    },
  });

  // Register global components
  options.global.components['font-awesome-icon'] = FontAwesomeIcon;

  return mount(component, options);
});

// Example use:
// cy.mount(MyComponent)
