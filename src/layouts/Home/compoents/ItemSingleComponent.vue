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
  <el-menu-item :index="props.itemChildren?.path">
    <component
      :is="props.itemChildren?.icon || ''"
      style="width: 1.4em; height: 1.4em; margin-right: 8px"
    />
    <span>{{ props.itemChildren?.label }}</span>
  </el-menu-item>
</template>
