import { createApp } from 'vue';
import lazyPlugin from 'vue3-lazy'
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import './permission';
import permission from '@/directive/permission'
import 'element-plus/dist/index.css';
import '@/assets/style/common.scss';
import '@/assets/style/iconfont/iconfont.css';
import './rem'
import i18n from '@/config/lang'

// export function createApp() {
//   const app = createSSRApp(App)
//   app.use(ElementPlus, {
//     locale: zhCn,
//   })
//   const store = createStore()
//   app.use(store)
//   const router: Router = createRouter()
//   app.use(router)
//   return { app, router, store }
// }

// .use(permission)
createApp(App)
  .use(router)
  .use(store)
  .use(lazyPlugin, {})
  .use(i18n)
  .use(permission)
  .mount('#app');
