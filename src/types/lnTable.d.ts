interface lnTableColumnType {
  // 字段名称 对应列内容的字段名
  prop?: string;

  // 列宽度
  width?: string | number | undefined;

  // 列类型
  type?: "expand" | "selection" | "index" | "slot" | undefined;

  // 列插槽名
  slotName?: string;

  // 列头部标题
  label?: string | undefined;

  // 列固定位置
  fixed?: "left" | "right" | undefined;

  // 列对齐方式
  align?: "left" | "center" | "right" | undefined;

  // 列格式化方法
  formatter?: Function | undefined;

  // 当该列数据过长时是否隐藏
  tooltip?: boolean | undefined;

  // type=selection 的列有效,判断该列是否可多选
  selectable?: Function | undefined;
}

interface lnEditTableColumnType {
  // 字段名称 对应列内容的字段名
  prop?: string;

  // 列宽度
  width?: string | number | undefined;

  // 列类型
  type?: "selection" | "index" | "slot" | "string" | undefined;

  // 列插槽名
  slotName?: string;

  // 列头部标题
  label?: string | undefined;

  // 列固定位置
  fixed?: "left" | "right" | undefined;

  // 列对齐方式
  align?: "left" | "center" | "right" | undefined;

  // 当该列数据过长时是否隐藏
  tooltip?: boolean | undefined;

  // type=selection 的列有效,判断该列是否可多选
  selectable?: Function | undefined;
}

interface lnTableConfig {
  // 是否显示分页
  isPagination: boolean;

  // table总数据条数
  total: number;

  // table分页页数
  page: number;

  // table每页数量
  size: number;
}

interface lnEditTableConfig {
  // 是否开启编辑
  isEdit: boolean;

  // 是否显示分页
  isPagination: boolean;

  // table总数据条数
  total: number;

  // table分页页数
  page: number;

  // table每页数量
  size: number;
}
