import { ref, nextTick, watch } from 'vue';
import {
  RouteRecordRaw,
} from 'vue-router';
import router from '@/router';
import { getToken } from '@/utils/auth';
import store from '@/store';

const permissions = store.getters && store.getters.permissions
const whiteList: string[] = ['layout', 'upload', 'index', 'd3three', 'code', 'lazy', 'vip', 'searchList', 'company', 'novip', 'org', 'relationMap', 'scatterMap', 'join', 'home'];
const accessRoutes:any[] = [
  // {
  //   path: 'configurationBoot',
  //   name: 'configurationBoot',
  //   meta: {
  //     name: '快速开始',
  //     showAppFooter: true,
  //   },
  //   component: () => import('@/view/configurationBoot/index.vue'),
  // },
]
const registerRouteFresh = true
router.beforeEach(async (to, from, next) => {
  // store.dispatch('getNotice');
  if (getToken()) { // 登录的情况下
    // if (!store.getters.info) {
    //   await store.dispatch('getUserInfo')
    // }
    // if (!store.getters.orgInfo && registerRouteFresh) {
    //   await store.dispatch('getOrgInfo');
    // }
    // if (!store.getters.permissions) {
    //   await store.dispatch('getOrgInfo');
    //   next({ ...to, replace: true })
    // }
    // if (store.getters.permissions !== '只读') { // 添加路由
    //   // 判断路由是否已经被添加
    //   const index = router.getRoutes().findIndex((item:any) => item.name === 'configurationBoot');
    //   if (index === -1) {
    //     accessRoutes.forEach((accessRoute:any) => {
    //       // 根结点添加路由
    //       router.addRoute('home', accessRoute)
    //     });
    //   }
    // }
    next();
  } else { // 未登录时
    if (whiteList.includes(to.name as string)) {
      next();
    } else {
      next('/');
    }
  }
});

router.afterEach(() => {
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
});
