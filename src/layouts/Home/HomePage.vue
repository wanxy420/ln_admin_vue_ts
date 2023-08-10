<template>
  <el-container class="w-screen h-screen bg-gray-200">
    <el-aside width="240px" class="rounded bg-white">
      <MenuIndex />
    </el-aside>
    <el-container>
      <el-header class="rounded bg-white mx-2"></el-header>
      <el-main class="rounded">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import MenuIndex from "@/layouts/Home/compoents/MenuIndexComponent.vue";
</script>
<style scoped lang="scss">
:deep(.el-main) {
  padding: 8px;
}
</style>
