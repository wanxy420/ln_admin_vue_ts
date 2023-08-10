<script lang="ts" setup>
import { ref, PropType, onMounted } from "vue";
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";
import { lnMessage } from "@/utils/fun";

interface lnUploadConfigType {
  // 是否支持多选文件
  multiple?: boolean | undefined;

  // 上传组件最大上传个数
  limit?: number | undefined;

  // 上传组件提示文字
  tip?: string | undefined;

  // 是否显示上传列表
  showlist?: boolean | undefined;

  // 是否取消自动上传
  autoUpload?: boolean;
}

const props = defineProps({
  // 上传文件绑定值
  fileList: {
    type: Array<UploadUserFile>,
  },
  // 组件配置
  config: {
    type: Object as PropType<lnUploadConfigType>,
  },
  // 上传文件请求路径
  action: {
    type: String,
  },
  // 上传文件请求头
  headers: {
    type: Object,
  },
  // 上传文件携带的参数
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onSuccess", "onRemove", "onError", "onChange"]);
const uploadRef = ref<UploadInstance>();
const pageFileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  emit("onRemove", file, uploadFiles);
};
// 上传列表某项
const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  /**
   * 点击列表事件区域
   */
};
// 点击上传文件成功返回
const onSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
  uploadFiles
) => {
  if (response.code != 200) {
    lnMessage(response.msg, "error");
  } else {
    lnMessage(response.msg, "success");
  }
  emit("onSuccess", uploadFile, uploadFiles);
};
const onExceed: UploadProps["onExceed"] = () => {
  lnMessage(
    `当前限制选择 ${
      props.config?.limit || 1
    } 个文件，请先删除当前已上传文件后再选择文件上传`,
    "warning"
  );
};
const submitUpload = () => {
  uploadRef.value!.submit();
};
const onError = () => {
  emit("onError", "");
};
const onChange = () => {
  emit("onChange", "");
};

onMounted(() => {
  pageFileList.value = props.fileList || [];
});

defineExpose({
  submitUpload,
});
</script>
<template>
  <el-upload
    ref="uploadRef"
    :show-file-list="props?.config?.showlist"
    v-model:file-list="pageFileList"
    class="upload-demo"
    :action="props?.action"
    :multiple="props?.config?.multiple"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="onSuccess"
    :on-exceed="onExceed"
    :on-error="onError"
    :on-change="onChange"
    :limit="props?.config?.limit || 1"
    :headers="props?.headers"
    :data="props?.data"
    :disabled="props.disabled"
    :auto-upload="props?.config?.autoUpload"
  >
    <slot>
      <el-button type="primary" v-if="!props.disabled">点击上传</el-button>
    </slot>
    <template #tip>
      <div class="el-upload__tip">
        {{ props?.config?.tip }}
      </div>
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
.upload-demo {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.el-upload-list {
  width: 100%;
}
</style>
