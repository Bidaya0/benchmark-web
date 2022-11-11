import axios from 'axios'; // 引入axios
import { getToken } from '@/utils/auth';
import ssoLogin from '@/utils/ssoLogin';
import { logout } from '@/api/user';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 99999,
});

// http request 拦截器
service.interceptors.request.use(
  (config:any) => {
    // 全局添加 token
    if (getToken()) {
      config.headers['asr-token'] = getToken();
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

// http response 拦截器
service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status && error.response.status === 403) {
      logout().then(() => {
        console.log('403 log out');
        // removeToken()
        ssoLogin();
      });
    }
    // 网络超时
    if (error.message && error.message.includes('timeout')) {
      console.error('请求超时');
      return error.message;
    }
    if (error.response && error.response.status && error.response.status === 500) {
      // 没有权限
      console.error('接口异常');
      return error;
    }
    return error;
  },
);

export default service;
