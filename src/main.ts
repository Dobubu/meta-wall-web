import 'virtual:windi.css';
import 'virtual:windi-devtools';
import './assets/scss/index.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
