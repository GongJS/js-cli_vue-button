<template>
  <div>
    <div class="title">Button Example Code</div>
    <VueLive
      :code="`<AButton>按键</AButton>`"
      :components="{ AButton }"
      :layout="Layout"
      @error="(e) => handleError(e)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VueLive } from "vue-live";
import "vue-live/lib/vue-live.esm.css";
import "./style.less";
import AButton from "../src/components/a-button/AButton.vue";
import Layout from "./Layout.vue";

@Component({
  components: {
    VueLive,
  },
})
export default class App extends Vue {
  AButton = AButton;
  Layout = Layout;
}
</script>

<style lang="less" scoped>
.title {
  color: rgb(248, 248, 242);
  font-size: 1.333em;
  margin-bottom: 1.25rem;
  margin-top: 3.125rem;
  text-align: center;
}
</style>
