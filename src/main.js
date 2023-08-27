import { createApp } from "vue";
import "./styles/global.scss";
import App from "./App.vue";
import store from "./store";

createApp(App).use(store).mount("#app");
