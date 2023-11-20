import { createApp } from "vue";
import "./styles/global.scss";
import App from "./App.vue";
import ChromeExtension from "./chrome/ChromeExtension.js";

const chromeExtension = new ChromeExtension();

createApp(App)
    .provide('chromeExtension', chromeExtension)
    .mount("#app");
