<template>
  <div class="flex-1">
    <el-scrollbar>
      <div class="w-full h-full flex items-center">
        <template
          v-for="(item, index) in authSotre.getTagsList"
          :key="item.path"
        >
          <el-tag
            :type="item.path === route.path ? '' : 'info'"
            effect="dark"
            size="large"
            closable
            @close="handleDeleteTags(index)"
            @click="handleToPath(item.path)"
            class="mr-2 cursor-pointer"
          >
            {{ item.label }}
          </el-tag>
        </template>
      </div>
    </el-scrollbar>
    
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRoute, useRouter } from "vue-router";

const authSotre = useAuthStore();
const route = useRoute();
const router = useRouter();

// 点击删除对应页面
function handleDeleteTags(index: number) {
  authSotre.delTags(index);
}
// 点击跳转到对应页面
function handleToPath(path: string) {
  router.push(path);
}
</script>
<style scoped lang="scss"></style>
