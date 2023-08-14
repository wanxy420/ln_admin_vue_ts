<template>
  <div class="w-12 h-12 bg-white rounded flex justify-center items-center mr-2">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { logOut } from "@/utils/fun";
</script>
<style scoped lang="scss"></style>
