import 'virtual:windi.css';
import 'virtual:windi-devtools';
import './assets/scss/index.scss';
import 'animate.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import webSocketPlugin from '@/plugins/ws';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faThumbsUp, faCircleRight, faComments } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faCircleNotch,
  faXmark,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBell);
library.add(faThumbsUp);
library.add(faMagnifyingGlass);
library.add(faCircleRight);
library.add(faCircleNotch);
library.add(faXmark);
library.add(faTrashCan);
library.add(faComments);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(webSocketPlugin);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
