import Vue from "vue";
import App from "./App.vue";
import coverImage from "../cover-image/coverImage.png";

Vue.config.productionTip = false;

const img = new Image();
img.src = coverImage;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
