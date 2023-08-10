<template>
  <div class="ln-scroll-list">
    <div class="ln-scroll-pull" ref="boxs">
      <div class="loaders">下拉刷新页面...</div>
    </div>
    <div
      @touchstart="onTouchstart"
      class="ln-scroll-body hide-scrollbar"
      id="ln-scroll-body"
      v-infinite-scroll="load"
      :infinite-scroll-distance="20"
      :infinite-scroll-immediate="false"
    >
      <slot></slot>
      <el-backtop :visibility-height="50" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isUndefined } from "lodash";
import { ref } from "vue";
import useStore from "@/store";
const { config } = useStore();

// 判断刷新页面
const isRefresh = ref<boolean>(true);

const emit = defineEmits(["scrollLoad", "pullLoad"]);
let disy: number = 0;
let y: number = 0;

const boxs = ref<HTMLDivElement>();
const getbox = () => boxs.value as HTMLDivElement;

// 触底加载更多
const load = () => {
  if (config.isMobile) {
    emit("scrollLoad");
  }
};

const onTouchstart = (e: TouchEvent) => {
  if (config.isMobile) {
    disy = e.changedTouches[0].pageY - y;
    getbox().style.transition = `none`;
    if (!isUndefined(document.ontouchmove)) document.ontouchmove = fnmove;
    if (!isUndefined(document.ontouchend)) document.ontouchend = fnend;
  }
};

const fnmove = (e: TouchEvent) => {
  const body = document.getElementById("ln-scroll-body");
  if (body?.scrollTop === 0) {
    if (isRefresh.value) {
      y = e.changedTouches[0].pageY - disy;
      getbox().style.height = y / 3 + "px";
    }
  } else {
    if (isRefresh.value) {
      isRefresh.value = false;
    }
  }
};
const fnend = (e: TouchEvent) => {
  console.log(e);
  const body = document.getElementById("ln-scroll-body");
  if (body?.scrollTop === 0) {
    if (!isRefresh.value) {
      y = 0;
      isRefresh.value = true;
    }
  }
  getbox().style.transition = `0.3s sase height`;
  if (y > 200) {
    y = 50;
    emit("pullLoad");
    getbox().style.height = y + "px";
  } else {
    getbox().style.height = "0px";
  }
  document.ontouchmove = null;
  document.ontouchend = null;
};

const hidePull = () => {
  getbox().style.height = "0px";
};

defineExpose({
  hidePull,
});
</script>
<style lang="scss" scoped>
.ln-scroll-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .ln-scroll-body {
    width: 100%;
    flex: 1;
    overflow: auto;
  }

  .ln-scroll-pull {
    width: 100%;
    height: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e7e7e7;
  }
}

@keyframes animate8345 {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(360deg);
  }
}

.loaders {
  color: rgb(0, 0, 0);
  background: linear-gradient(to right, #2d60ec, #3ccfda);
  font-size: 14px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animate8345 9s linear infinite;
  font-weight: bold;
}
</style>
