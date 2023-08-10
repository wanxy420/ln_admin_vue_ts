<template>
  <el-container class="w-screen h-screen bg-gray-200">
    <el-aside
      :width="configStore.getIsCollapse ? '240px' : '0px'"
      class="rounded transition-all h-screen z-20"
      :class="configStore.getIsMobile ? 'fixed' : ''"
    >
      <MenuIndex />
    </el-aside>
    <el-container>
      <el-header class="rounded">
        <Header />
      </el-header>
      <el-main class="rounded">
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <KeepAlive
                :include="
                  authStore.getTagsList.map((item) => {
                    return item.name;
                  })
                "
              >
                <component :is="Component" :key="$route.name" />
              </KeepAlive>
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
    <div
      v-if="configStore.getIsCollapse && configStore.getIsMobile"
      class="mask w-screen h-screen fixed z-10"
      @click="configStore.setIsCollapse(!configStore.getIsCollapse)"
    ></div>
  </el-container>
</template>

<script setup lang="ts">
import MenuIndex from "@/layouts/Home/compoents/MenuIndexComponent.vue";
import Header from "./compoents/HeaderComponent.vue";
import { useConfigStore } from "@/store/config";
import { useAuthStore } from "@/store/auth";

const configStore = useConfigStore();
const authStore = useAuthStore();

console.log(
  authStore.getTagsList.map((item) => {
    return item.name;
  })
);
</script>
<style scoped lang="scss">
:deep(.el-main) {
  padding: 8px;
}
:deep(.el-header) {
  padding: 0;
}
:deep(.el-header) {
  height: 50px;
}

.mask {
  background-color: rgba($color: #000000, $alpha: 0.4);
}
</style>
