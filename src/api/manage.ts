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
export const messageChangeload: requestModel = (params:any) => request.post('/managerment/manage/changeload', params);

// sql 2
// list /vulforcheck/002/generateMessage
export const generateMessage: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/dataDisplay?page=${params.page}&pageSize=${params.pageSize}`);
// del
export const logicExecMessage: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/logicExec?id=${params.id}`);
// list count
export const dataDisplayCount: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/dataDisplayCount`);
// /vulforcheck/002/generateMessage
export const generateMessage02: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/generateMessage`);

// sql3
export const logicExec3Message: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/generateMessage`);

// sql1 list  /vulforcheck/001/dataDisplay
export const dataDisplayMessage: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/dataDisplay?page=${params.page}&pageSize=${params.pageSize}`);
export const dataDisplayCountMessage: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/dataDisplayCount`);
// 生成内容 vulforcheck/001/generateMessage
export const sqlMessage: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/generateMessage`);
// save vulforcheck/001/logicExec
export const sql1LogicExec: requestModel = (params:any) => request.get(`/vulforcheck/${params.path}/logicExec?title=${params.title}&context=${params.context}`);

// 分数
export const testscores: requestModel = (params:any) => request.get('/managerment/manage/testscores');
