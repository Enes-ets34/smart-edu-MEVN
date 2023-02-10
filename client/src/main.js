import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import appNavbar from "../src/components/shared/appNavbar.vue";
import appFooter from "../src/components/shared/appFooter.vue";
import appAlert from "../src/components/shared/appAlert.vue";
import appLoader from "../src/components/shared/appLoader.vue";
import "../src/assets/bootstrap.min.css";
createApp(App)
  .use(store)
  .use(router)
  .component("appNavbar", appNavbar)
  .component("appFooter", appFooter)
  .component("appAlert", appAlert)
  .component("appLoader", appLoader)
  .mount("#app");
