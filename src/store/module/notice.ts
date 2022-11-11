import { ElMessage } from 'element-plus';
import { messageNotifyApi, changeMessageNotifyApi } from '@/api/notice';
import { formatTime } from '@/utils';

export const notice = {
  state(): any {
    return {
      list: [],
      total: 0,
    };
  },
  mutations: {
    setNotice(state: any, data: any) {
      state.list = data.data && data.data.reduce((list: any[], item: any) => {
        if (item.intro.indexOf('{"') !== -1) {
          item.intro = JSON.parse(item.intro)
        }
        list.push({
          ...item,
          CreatedAt: formatTime(new Date(item.CreatedAt).getTime()),
        });
        return list;
      }, []) || [];
      state.total = data.total;
    },
  },

  actions: {
    async getNotice(context: any) {
      const { code, msg, data } = await messageNotifyApi({
        page: 1,
        pageSize: 4,
        read: false,
      });
      if (code !== 0) {
        console.error(msg);
        context.commit('setNotice', { data: [], total: 0 });
        return;
      }
      context.commit('setNotice', data);
    },
    async readAllNotices(context: any) {
      const { code, msg } = await changeMessageNotifyApi({
        clear_all: true,
      });
      if (code !== 0) {
        ElMessage.error(msg);
        return;
      }
      context.commit('setNotice', { data: [], total: 0 });
    },
  },
  getters: {
    noticeTotal(state: any) {
      return state.total;
    },
    noticeList(state: any) {
      return state.list;
    },
  },
};
