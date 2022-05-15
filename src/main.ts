import 'virtual:windi.css';
import 'virtual:windi-devtools';
import './assets/scss/index.scss';
import 'animate.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faBell);
library.add(faThumbsUp);
library.add(faMagnifyingGlass);

createApp(App)
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
