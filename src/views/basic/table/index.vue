<template>
  <div>
    <ln-table
      :table-data="tableData"
      :table-column="tableColumn"
      :config="config"
      @handle-current-change="handleCurrentChange"
      @handle-size-change="handleSizeChange"
      @scroll-load="scrollLoad"
      @pull-load="pullLoad"
      ref="tableRef"
    >
      <template #dateTags="row">
        <el-tag>
          {{ row.row.date }}
        </el-tag>
      </template>
      <template #expandSlot="row">
        <el-tag>
          {{ row.row.date }}
        </el-tag>
      </template>
      <template #operationSlot="row">
        <div style="display: flex; justify-content: space-around; width: 100%">
          <el-link type="primary">详情</el-link>
          <el-link type="primary">修改</el-link>
          <el-link type="danger">删除</el-link>
        </div>
      </template>
      <template #card="row">
        <ln-card>
          <template #titleLeft>{{ row.row.name }}</template>
          <template #titleRight>
            <el-tag>{{ row.row.date }}</el-tag>
          </template>
          <template #body>
            <div>地址: {{ row.row.address }}</div>
          </template>
          <template #bottom>
            <div
              style="display: flex; justify-content: space-around; width: 100%"
            >
              <el-link type="primary">详情</el-link>
              <el-link type="primary">修改</el-link>
              <el-link type="danger">删除</el-link>
            </div>
          </template>
        </ln-card>
      </template>
    </ln-table>
  </div>
</template>

<script setup lang="ts">
import LnTable from "@/components/LnTable/LnTable.vue";
import LnCard from "@/components/LnCard/LnCard.vue";
import { ref } from "vue";

const tableRef = ref<any>();
// 表格数据
const tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
// 表格列配置项
const tableColumn = ref<lnTableColumnType[]>([
  {
    type: "expand",
    slotName: "expandSlot",
  },
  {
    type: "index",
    label: "序号",
    width: 70,
  },
  {
    type: "selection",
    width: 70,
  },
  {
    type: "slot",
    slotName: "dateTags",
    prop: "date",
    label: "插槽",
  },
  {
    prop: "date",
    label: "时间",
  },
  {
    prop: "name",
    label: "名字",
  },
  {
    prop: "address",
    label: "地址",
  },
  {
    width: 200,
    type: "slot",
    prop: "date",
    slotName: "operationSlot",
    label: "操作",
  },
]);
// 表格配置项
const config = ref<lnTableConfig>({
  isPagination: true,
  total: 50,
  page: 1,
  size: 10,
});

// 点击切换页数
const handleCurrentChange = (e: any) => {
  config.value.page = e;
};
// 点击切换条数
const handleSizeChange = (e: any) => {
  config.value.size = e;
};

const scrollLoad = () => {
  tableData.value = [...tableData.value, ...tableData.value];
};

const pullLoad = () => {
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
  setTimeout(() => {
    console.log(tableRef.value);
    tableRef.value.hidePull();
  }, 1000);
};
</script>
<style scoped lang="scss"></style>
