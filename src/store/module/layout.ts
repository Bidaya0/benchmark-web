export const keyword = {
  state(): string {
    return '';
  },
  mutations: {
    setKeyword(state: any, val: string) {
      state.keyword = val;
    },
  },
  actions: {
    keywordChange(context: any, val: string) {
      context.commit('setKeyword', val);
    },
  },
  getters: {
    keyword(state: any) {
      return state.keyword;
    },
  },
};
export const language = {
  state(): string {
    return '';
  },
  mutations: {
    setKeyword(state: any, val: string) {
      state.language = val;
    },
  },
  actions: {
    languageChange(context: any, val: string) {
      context.commit('setKeyword', val);
    },
  },
  getters: {
    language(state: any) {
      return state.language || 'en';
    },
  },
};
export const isHeaderTransparent = {
  state(): boolean {
    return false;
  },
  mutations: {
    setHeaderTransparent(state: any, val: boolean) {
      state.isHeaderTransparent = val;
    },
  },
  actions: {
    headerTransparentChange(context: any, val: boolean) {
      context.commit('setHeaderTransparent', val);
    },
  },
  getters: {
    isHeaderTransparent(state: any) {
      return state.isHeaderTransparent;
    },
  },
};
