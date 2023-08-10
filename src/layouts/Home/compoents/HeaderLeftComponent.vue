<template>
  <div
    class="m-2 p-2 relative flex justify-center items-center rounded bg-white"
    :class="configStore.getIsCollapse ? 'rotate-0' : 'rotate-180'"
    @click="handleCollapse"
  >
    <el-icon
      size="24"
      class="transition-all"
      :style="{
        transform: configStore.getIsCollapse
          ? 'rotate(0deg)'
          : 'rotate(180deg)',
      }"
    >
      <Fold />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/store/config";

const configStore = useConfigStore();

function handleCollapse() {
  configStore.setIsCollapse(!configStore.getIsCollapse);
}
</script>
<style scoped lang="scss">
* {
  transform: scale(180deg);
}
</style>
