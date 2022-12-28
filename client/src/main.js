import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import appNavbar from "../src/components/shared/appNavbar.vue";
import "/Users/enestahasari/Desktop/Çalışma Alanı - Nodejs/06-smart-edu/client/src/assets/bootstrap.min.css";
createApp(App)
  .use(store)
  .use(router)
  .component("appNavbar", appNavbar)
  .mount("#app");
