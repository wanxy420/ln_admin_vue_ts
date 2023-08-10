<template>
  <div class="ln-card-content">
    <div class="ln-card-header" v-if="slotTitle">
      <span class="ln-card-header-left">
        <slot name="titleLeft"></slot>
      </span>
      <span class="ln-card-header-right">
        <slot name="titleRight"></slot>
      </span>
    </div>
    <div class="ln-card-body" v-if="slotBody">
      <slot name="body"></slot>
    </div>
    <div class="ln-card-bottom" v-if="slotBottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";

//判断<slot name="test"/>是否有传值
const slotTitle = !!useSlots().titleLeft || !!useSlots().titleRight;
const slotBody = !!useSlots().body;
const slotBottom = !!useSlots().bottom;
</script>

<style lang="scss" scoped>
.ln-card-content {
  height: auto;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 8px 0;

  .ln-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 4px 8px;

    .ln-card-header-left {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ln-card-header-right {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ln-card-body {
    padding: 8px;
  }

  .ln-card-bottom {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px;
  }
}
</style>
