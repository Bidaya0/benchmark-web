// import { useRouter } from 'vue-router';
import { UserInfo } from '@/types/store/user';
import { getUserInfo, logout, getOrgInfo } from '@/api/user';
import { delToken } from '@/utils/auth';

// const Router = useRouter();
export const user = {
  state(): UserInfo | null {
    return null;
  },
  mutations: {
    setUserInfo(state: any, data: UserInfo | null) {
      state.user = data;
    },
    setOrgUserInfo(state: any, data: any) {
      state.userOrg = data;
    },
    setOrgPermissions(state: any, data: any) {
      state.permissions = data;
    },
  },
  actions: {
    async getOrgInfo(context: any) {
      const { data, code, msg } = await getOrgInfo();
      if (code !== 0) {
        if (code === 7 && msg === '未登录或非法访问') {
          delToken()
        }
        // if (code === 9) {
        //   Router.push('/rejectUser');
        // }
        console.error(msg);
        return;
      }
      context.commit('setOrgUserInfo', data);
      console.log('authority', data)
      let arr = ''
      if (data.authority === '所有者') {
        arr = '超级管理员'
      }
      if (data.authority === '管理') {
        arr = '管理员'
      }
      if (data.authority === '可写') {
        arr = '普通'
      }
      if (data.authority === '可读') {
        arr = '只读'
      }
      context.commit('setOrgPermissions', arr);
    },
    async getUserInfo(context: any) {
      const { data, code, msg } = await getUserInfo();
      if (code !== 0) {
        console.error(msg);
        return;
      }
      context.commit('setUserInfo', data);
    },
    async logout(context: any) {
      await logout();
      context.commit('setUserInfo', null);
    },
  },
  getters: {
    info(state: any) {
      return state.user;
    },
    orgInfo(state: any) {
      return state.userOrg;
    },
    permissions(state: any) {
      return state.permissions;
    },
  },
};
