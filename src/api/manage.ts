import request from '@/utils/request';
import { requestModel } from '@/types/service';

// 获取漏洞列表
export const messageVulList: requestModel = (params:any) => request.get(`/managerment/manage/vul_list?page=${params.page}&pagesize=${params.pageSize}`);
// 获取漏洞列表总数
export const messageVulListCount: requestModel = (params:any) => request.get('/managerment/manage/vul_list/count');
// 图 /managerment/manage/metric_display
export const messageMetric_display: requestModel = (params:any) => request.get('/managerment/manage/metric_display');
// 操作列表
export const messageLogDisplay: requestModel = (params:any) => request.get(`/managerment/manage/log_display?page=${params.page}&pagesize=${params.pageSize}`);
// 获取操作列表总数 /managerment/manage/log_count
export const messageLogcount: requestModel = (params:any) => request.get('/managerment/manage/log_count');
// 修改状态 /managerment/manage/changeload
