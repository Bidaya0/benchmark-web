import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { user } from '@/store/module/user';
import { keyword, isHeaderTransparent, language } from '@/store/module/layout';
import { notice } from '@/store/module/notice';

const persistedState = new VuexPersistence({ // 数据持久化
  storage: window.sessionStorage,
  modules: ['keyword', 'language'],
});

const store = createStore({
  plugins: [persistedState.plugin],
  modules: {
    user,
    keyword,
    isHeaderTransparent,
    language,
    notice,
  },
});

export default store;
