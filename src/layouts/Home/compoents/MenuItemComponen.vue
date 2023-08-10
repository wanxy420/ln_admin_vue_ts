<script lang="ts" setup>
import { PropType, computed } from "vue";
import ItemSingle from "./ItemSingleComponent.vue";
import ItemMultiple from "./ItemMultipleComponent.vue";
import { MenuItemInterface } from "@/api/common/modules/index";

const props = defineProps({
  itemChildren: {
    type: Object as PropType<MenuItemInterface>,
  },
});

const componentId = computed(() => {
  console.log(props.itemChildren);
  if (
    props.itemChildren?.children &&
    Array.isArray(props.itemChildren?.children) &&
    props.itemChildren?.children.length > 0
  ) {
    return ItemMultiple;
  } else {
    return ItemSingle;
  }
});
</script>
<template>
  <component :is="componentId" :itemChildren="props.itemChildren">
    <MenuItemComponen
      v-for="item in props.itemChildren?.children"
      :key="item.id"
      :itemChildren="item"
    />
  </component>
</template>
