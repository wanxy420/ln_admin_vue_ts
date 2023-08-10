<script lang="ts" setup>
import { PropType } from "vue";

const emit = defineEmits(["handleSizeChange", "handleCurrentChange"]);
const props = defineProps({
  paginationConfig: {
    type: Object as PropType<lnTableConfig>,
  },
});

// 分页组件切换条数
const handleSizeChange = (e: any) => {
  emit("handleSizeChange", e);
};
// 分页组件切换页数
const handleCurrentChange = (e: any) => {
  emit("handleCurrentChange", e);
};
</script>
<template>
  <el-pagination
    :currentPage="props.paginationConfig?.page"
    :page-size="props.paginationConfig?.size"
    :page-sizes="[10, 15, 30, 50]"
    small
    background
    layout="prev, pager, next, sizes"
    :total="props.paginationConfig?.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style lang="less" scoped></style>
