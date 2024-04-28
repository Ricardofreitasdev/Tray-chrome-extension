import { createApp } from 'vue';
import './styles/global.scss';
import App from './App.vue';
import ChromeExtension from './chrome/chromeExtension.js';

createApp(App).provide('chromeExtension', ChromeExtension).mount('#app');
