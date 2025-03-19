<template>
  <div class="app-container">
    <iframe frameborder="0" :src="iframeSrcUrl" />
  </div>
</template>

<script lang="ts" setup name="CustCapDashboard">
import { getAccessToken } from "@/utils/auth";
const baseUrl = import.meta.env.VITE_APP_BASE_API;
var token = getAccessToken();
const iframeSrcUrl =
  baseUrl + "/cust/cap/index.html?perm=eventbus-cust-dashboard&access_token=" + token;
</script>

<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
}

/** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
