import axios from 'axios';
import request from '@/utils/request';
import { requestModel } from '@/types/service';
import requestCallbackAll from '@/utils/requestCallbackAll';

// 上传文件
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
export const axiosRequest = ({
  url,
  method = 'post',
  data,
  headers = {},
  onUploadProgress = (e:any) => e, // 进度回调
}:any) => new Promise((resolve, reject) => {
  axios[method](url, data, {
    headers,
    onUploadProgress, // 传入监听进度回调
    cancelToken: source.token,
  })
    .then((res:any) => {
      resolve(res);
    })
    .catch((err:any) => {
      reject(err);
    });
})
export const pauseUpload = () => {
  source.cancel('中断上传!');
  source = CancelToken.source(); // 重置source，确保能续传
}
// 获取用户信息
export const getUserInfo: requestModel = () => request({
  url: '/info',
  method: 'get',
});

// 退出登录
export const logout: requestModel = () => request({
  url: '/quit',
  method: 'post',
});

// 攻击面-风险统计
export const AttackSurfaceRiskStatistic: requestModel = (params) => request.post('/attack_surface_risk_statistic', params);

// 攻击面-企业风险
export const AttackSurfaceCorpRisk: requestModel = (params) => request.post('/attack_surface_corp_risk', params);

// 攻击面-企业
export const AttackSurfaceCorpList: requestModel = (params) => request.post('/attack_surface_corp_list', params);

// 自动导入提示
export const AutomaticImport: requestModel = (params) => request.post('/automatic_import', params);

// 供应商倒入
export const AddTripartite: requestModel = (params) => request.post('/add_tripartite', params);

// 删除供应商
export const DeleteTripartite: requestModel = (params) => request.post('/delete_tripartite', params);

// 添加标签
export const AddTag: requestModel = (params) => request.post('/add_tag', params);

// 删除标签
export const DeleteTag: requestModel = (params) => request.post('/delete_tag', params);

// 更新标签
export const UpdateTag: requestModel = (params) => request.post('/update_tag', params);

// 供应商对比
export const SupplierComparison: requestModel = (params) => request.post('/supplier_comparison', params);

// 三方列表
export const TripartiteList: requestModel = (params) => request.post('/tripartite_list', params);

// 编辑供应商
export const updateTripartite: requestModel = (params) => request.post('/update_tripartite', params);

// 风险资产总数
export const overviewRisksAssets: requestModel = (params) => request.post('/overview_risks_assets', params);

// 三方风险资产总数
export const overviewTripartiteRisksAssets: requestModel = (params) => request.post('/overview_tripartite_risks_assets', params);

// /overview_trend 风险资产趋势
export const overviewTrend: requestModel = (params) => request.post('/overview_trend', params);

// 风险分布 /overview_risk_distribution
export const overviewRiskDistribution: requestModel = (params) => request.post('/overview_risk_distribution', params);

// 风险等级 /overview_level_risk
export const overviewLevelRisk: requestModel = (params) => request.post('/overview_level_risk', params);

// 三方供应商风险排行 /overview_tripartite_risk_rank
export const overviewTripartiteRiskRank: requestModel = (params) => request.post('/overview_tripartite_risk_rank', params);

// 消息查询 /notify_settings
export const getNotifySettings: requestModel = () => request.get('/notify_settings');

// 消息设置 //notify_settings
export const setNotifySettings: requestModel = (params) => request.post('/notify_settings', params);

// 日志列表 /audit_log_list
export const auditLogList: requestModel = (params) => request.post('/audit_log_list', params);

// 创建导出任务 /create_export_audit_log
export const createExportAuditLog: requestModel = (params) => request.post('/create_export_audit_log', params);

// 日志导出文件 /get_audit_export_list
export const exportlogListApi: requestModel = (params) => request.post('/get_audit_export_list', params);

// 下载导出文件 /download_audit_export_file
// export const downloadAuditExportFile: requestModel = (params:any) => request.post(`/download_audit_export_file?task_id=${params?.task_id}`);
export const downloadAuditExportFile: any = (params: any) => requestCallbackAll.get('/download_audit_export_file', {
  params,
  timeout: 9999999,
  responseType: 'blob', // 告诉服务器我们需要的响应格式
}).then((res) => {
  const fileName = res.headers['content-disposition'].split('filename=')[1];
  const blob = new Blob([res.data], {
    type: 'application/octet-stream', // 将会被放入到blob中的数组内容的MIME类型
  });
  // const objectUrl = URL.createObjectURL(blob); // 生成一个url
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
});
// 删除导出记录 /delete_audit_export
export const deleteAuditExport: requestModel = (params) => request.post('/delete_audit_export', params);

// 查询集成信息设置 /delete_audit_export
export const getIntegratedSettings: requestModel = () => request.get('/integrated_all_settings');

// 集成信息设置 /delete_audit_export
export const setIntegratedSettings: requestModel = (params) => request.post('/integrated_settings', params);

// 测试集成信息 /integrated_test
export const integratedTest: requestModel = (params) => request.post('/integrated_test', params);

// 测试继承
export const integratedCancel: requestModel = (params) => request.post('/integrated_cancel', params);

// 批量导入
export const batchImport: requestModel = (params) => request.post('/batch_import', params);

// 自动识别子公司
export const automaticSubsidiary: requestModel = (params) => request.post('/automatic_subsidiary', params);

// 添加子公司
export const addSubsidiary: requestModel = (params) => request.post('/add_subsidiary', params);

// 查询已经认证的子公司
export const subsidiaryList: requestModel = (params) => request.post('/subsidiary_list', params);

// 为子公司添加标签 /subsidiary_tag_add
export const subsidiaryTagAdd: requestModel = (params) => request.post('/subsidiary_tag_add', params);

// 为子公司删除标签 /subsidiary_tag_delete
export const subsidiaryTagDelete: requestModel = (params) => request.post('/subsidiary_tag_delete', params);

// 删除子公司 /subsidiary_delete
export const subsidiaryDelete: requestModel = (params) => request.post('/subsidiary_delete', params);

// 软件供应商相关
// 软件供应商列表
export const softwareSupplyChainList: requestModel = (params) => request.post('/software_supply_chain_list', params);
// 删除供应商
export const deleteSoftwareSupplyChain: requestModel = (params) => request.post('/delete_software_supply_chain', params);
// 软件供应商名称搜索
export const completeSoftwareSupplyChainName: requestModel = (params) => request.post('/complete_software_supply_chain_name', params);
// 名称搜索软件供应商版本
export const completeSoftwareSupplyChainVersion: requestModel = (params) => request.post('/complete_software_supply_chain_version', params);
// 添加修改产品供应链
export const createSoftwareSupplyChain: requestModel = (params) => request.post('/create_software_supply_chain', params);

// 组织相关
// 生成邀请链接
export const generateLink: requestModel = (params) => request.post('/generate_link', params);
// 设置组织信息
export const setOrgInfo: requestModel = (params) => request.post('/set_org_info', params);
// 退出组织
export const quitOrg: requestModel = (params) => request.post('/quit_org', params);
// 解散组织
export const dissolveOrg: requestModel = (params) => request.post('/dissolve_org', params);
// 获取组织成员列表 getOrgMemberList get_org_user_list
export const getOrgMemberList: requestModel = (params) => request.post('/get_org_member_list', params);
// 获取组织成员列表 转让·使用 get_org_user_list
export const getOrgUserList: requestModel = (params) => request.post('/get_org_user_list', params);
// 转让组织/transfer_org
export const transferOrg: requestModel = (params) => request.post('/transfer_org', params);
// 设置用户权限
export const setOrgMemberAuthority: requestModel = (params) => request.post('/set_org_member_authority', params);
// 根据用户获取组织列表
export const getUserOrgList: requestModel = (params) => request.post('/get_user_org_list', params);
// 创建组织
export const createOrg: requestModel = (params) => request.post('/create_org', params);
// 设置用户当前选择的组织
export const setUserUseOrg: requestModel = (params) => request.post('/set_user_use_org', params);
// 获取组织信息 /get_org_info
export const getOrgInfo: requestModel = (params) => request.post('/get_org_info', params);
// 获取组织权限 /get_org_all_authority
export const getOrgAllAuthority: requestModel = (params) => request.post('/get_org_resources', params);
// 设置用户状态
export const setOrgMemberStatus: requestModel = (params) => request.post('/set_org_member_status', params);
// 加入组织
export const joinOrg: requestModel = (params:any) => request.get(`/join_org/${params.dataId}`);
// 提出组织
export const kickOutOrg: requestModel = (params) => request.post('/kick_out_org', params);
// 删除无效企业
export const deleteInvalidOrg: requestModel = (params) => request.post('/delete_invalid_org', params);
// 重新发送企业
export const invalidOrgResendVerification: requestModel = (params) => request.post('/invalid_org_resend_verification', params);
// 获取活动趋势
export const getActiveTrend: requestModel = (params) => request.post('/get_active_trend', params);

// 快速开始的token get_org_mem_token
export const getOrgMemToken: requestModel = (params) => request.post('/get_org_mem_token', params);
// 刷新token 模拟线上无需刷新
export const setOrgMemToken: requestModel = (params) => request.post('/set_org_mem_token', params);

// 资产中心 /assets_center
export const assetsCenter: requestModel = (params) => request.post('/assets_center', params);
// 查询云环境集成设置 /integrated_cloud_env
export const integratedCloudEnv: requestModel = () => request.get('/integrated_cloud_env');
// 更新云环境配置
export const integratedCloudEnvSet: requestModel = (params) => request.post('/integrated_cloud_env', params);
// 取消云环境配置
export const integratedCloudEnvCancel: requestModel = (params) => request.post('/integrated_cloud_env_cancel', params);
// 获取组织秘钥 /org_secret
export const orgSecret: requestModel = (params) => request.post('/org_secret', params);

// 风险管理 /risks_center
export const risksCenter: requestModel = (params) => request.post('/risks_center', params);
// 风险管理 /risks_center
export const risksCenterCount: requestModel = (params) => request.post('/risks_center_count', params);

// 漏洞情报 /risk_intelligence
export const riskIntelligence: requestModel = (params) => request.post('/risk_intelligence', params);
