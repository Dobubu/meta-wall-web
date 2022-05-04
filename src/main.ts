import 'virtual:windi.css';
import 'virtual:windi-devtools';
import './assets/scss/index.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faThumbsUp } from '@fortawesome/free-regular-svg-icons';

library.add(faBell);
library.add(faThumbsUp);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
