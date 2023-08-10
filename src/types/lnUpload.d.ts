interface lnUploadConfigType {
  // 是否支持多选文件
  multiple?: boolean | undefined;

  // 上传组件最大上传个数
  limit?: number | undefined;

  // 上传组件提示文字
  tip?: string | undefined;

  // 是否显示上传列表
  showlist?: boolean | undefined;

  // 上传请求方法
  method?: string | undefined;
}
