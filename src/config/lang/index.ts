// \src\i18n\index.ts
import { createI18n } from 'vue-i18n';
// 语言包
import zhCn from './zh_cn';
import en from './en';

const i18n = createI18n({
  legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  locale: sessionStorage.getItem('localeLang') || 'zhCn',
  messages: {
    zhCn,
    en,
  },
});

export default i18n;
