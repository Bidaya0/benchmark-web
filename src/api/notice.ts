import request from '@/utils/request';
import { requestModel } from '@/types/service';

// 获取通知消息列表
export const messageNotifyApi: requestModel = (params) => request.post('/message_notify', params);

// 更改未读状态
export const changeMessageNotifyApi: requestModel = (params) => request.post('/change_message_notify', params);

// 查看监控消息详情
export const getWatchDetailApi: requestModel = (params) => request.post('/get_watch_detail', params);
