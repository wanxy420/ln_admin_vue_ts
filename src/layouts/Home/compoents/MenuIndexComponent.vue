<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="h-full"
    text-color="#fff"
    router
    unique-opened
    :default-active="route.path"
  >
    <template v-for="item in authStore.getAuthList" :key="item.id">
      <MenuItem :itemChildren="item" />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import MenuItem from "./MenuItemComponent.vue";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
</script>
<style scoped lang="scss"></style>
