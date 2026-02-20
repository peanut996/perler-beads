// 下载网格的选项类型定义
export type GridDownloadOptions = {
  showGrid: boolean;
  gridInterval: number;
  showCoordinates: boolean;
  showCellNumbers: boolean;
  gridLineColor: string;
  includeStats: boolean;
  exportCsv: boolean; // 新增：是否同时导出CSV hex数据
  onWebViewDetected?: (appName?: string) => void; // 新增：当在 WebView 环境中检测到下载时的回调
};
