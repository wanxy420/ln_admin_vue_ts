<script lang="ts" setup>
import { PropType } from "vue";
import { MenuItemInterface } from "@/api/common/modules/index";

const props = defineProps({
  itemChildren: {
    type: Object as PropType<MenuItemInterface>,
  },
});
</script>
<template>
  <el-sub-menu :index="props.itemChildren?.path">
    <template #title>
      <component
        :is="props.itemChildren?.icon || ''"
        style="width: 1.2em; height: 1.2em; margin-right: 8px"
      />
      <span>{{ props.itemChildren?.label }}</span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>
