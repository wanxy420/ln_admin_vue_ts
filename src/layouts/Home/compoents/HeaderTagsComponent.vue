<template>
  <div class="flex-1 flex items-center">
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
    <el-dropdown>
      <span
        style="
          width: 25px;
          height: 50px;
          border-radius: 4px;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
        "
      >
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="closeTagsData('left')">
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item @click.native="closeTagsData('right')">
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item @click.native="closeTagsData('other')">
            关闭其他
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
const closeTagsData = (type: string) => {
  // if (type === "left") {
  //   home.headerTabsList.splice(
  //     0,
  //     home.headerTabsList.findIndex((x) => x.path === route.path)
  //   );
  // } else if (type === "right") {
  //   home.headerTabsList.splice(
  //     home.headerTabsList.findIndex((x) => x.path === route.path) + 1,
  //     home.headerTabsList.length
  //   );
  // } else if (type === "other") {
  //   home.headerTabsList = [
  //     home.headerTabsList[
  //       home.headerTabsList.findIndex((x) => x.path === route.path)
  //     ],
  //   ];
  // }
};
</script>
<style scoped lang="scss"></style>
