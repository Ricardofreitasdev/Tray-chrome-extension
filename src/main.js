import { createApp } from "vue";
import "./styles/global.scss";
import App from "./App.vue";
import store from "./store";
import ChromeExtension from "./chrome/ChromeExtension.js";

const chromeExtension = new ChromeExtension();

createApp(App)
    .use(store)
    .provide('chromeExtension', chromeExtension)
    .mount("#app");
