<template>
  <div class="w-screen h-screen">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/config";

const configStore = useConfigStore();

isMobile();
window.addEventListener("resize", () => {
  isMobile();
});

// 通过像素判断环境
function isMobile() {
  configStore.setIsMobile(document.body.clientWidth < 750);
}
</script>
<style lang="scss"></style>
