<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  // 表格值
  tableData: {
    type: Array,
  },
  config: {
    type: Object as PropType<lnEditTableConfig>,
  },
  tableColumn: {
    type: Array<lnEditTableColumnType>,
    default: () => [],
  },
});
</script>
<template>
  <el-table :data="props.tableData" border>
    <template v-for="(item, index) in props.tableColumn" :key="index">
      <el-table-column
        v-if="item?.type === 'index'"
        type="index"
        :width="item?.width"
        :label="item?.label"
        :align="item?.align || 'center'"
      />
      <el-table-column
        v-else
        :show-overflow-tooltip="item?.tooltip"
        :prop="item?.prop"
        :label="item?.label"
        :width="item?.width"
        :align="item?.align || 'center'"
      >
        <!-- <template #default="scope">
          <template v-if="item?.type === 'string'"></template>
          <template v-else></template>
        </template> -->
      </el-table-column>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  height: 100%;
}
</style>
