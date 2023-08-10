<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { watch } from "vue";

let item = document.querySelector("#ln-dialog");
if (item?.parentElement) item.parentElement.style.position = "relative";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  title: {
    type: String,
    default: "弹窗标题",
  },
  top: {
    type: String || Number,
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue", "close"]);

// 点击弹窗关闭
const handleClose = () => {
  emit("update:modelValue", false);
};
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      emit("close", {});
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div v-if="modelValue" id="ln-dialog">
    <div id="mask" @click="handleClose"></div>
    <div
      v-ln-drag
      v-if="modelValue"
      class="ln-dialog-content"
      :style="{
        width: props.width,
        height: props.height,
        marginTop: `${props.top}px`,
      }"
    >
      <div class="content-header">
        <span>{{ props.title }}</span>
        <el-icon @click="handleClose" class="header-close" :size="21">
          <Close />
        </el-icon>
      </div>
      <div class="content-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  .ln-dialog-content {
    width: calc(100vw - 16px) !important;
    height: calc(100vh) !important;
    margin-top: -8px !important;
    margin-left: -16px !important;
    border-radius: 0 !important;
  }
}
$borderRadius: 4px;
#ln-dialog {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  justify-content: center;
  z-index: 10;
  #mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: sticky;
    left: 0;
    top: 0;
  }
  .ln-dialog-content {
    position: absolute;
    background-color: white;
    border-radius: $borderRadius;
    display: flex;
    flex-direction: column;
    .content-header {
      padding: 8px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      font-size: 18px;
      position: sticky;
      background-color: #f2f2f2;
      border-bottom: 1px solid #d8d8d8;
      color: #6e6e6e;
      border-radius: $borderRadius $borderRadius 0 0;
      .header-close {
        cursor: pointer;
        border-radius: 50%;
      }
      .header-close:hover {
        color: #409eff;
      }
    }
    .content-body {
      width: 100%;
      flex: 1;
      padding: 8px;
      overflow: auto;
      background-color: white;
      border-radius: 0 0 $borderRadius $borderRadius;
    }
  }
}
</style>
