import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import './styles/global.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).mount('#app');
