<template>
  <div class="w-screen h-screen">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
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
  configStore.setIsCollapse(!(document.body.clientWidth < 750));
}
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
