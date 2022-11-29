import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          name: 'index',
        },
        component: () => import('@/views/home/layouts/index.vue'),
      },
      {
        path: '/sql',
        name: 'sql',
        meta: {
          name: 'sql',
        },
        component: () => import('@/views/home/sql/index.vue'),
      },
      {
        path: '/instructions',
        name: 'instructions',
        meta: {
          name: 'instructions',
        },
        component: () => import('@/views/home/instructions/index.vue'),
      },
    ],
  },
  {
    path: '/code',
    name: 'code',
    component: () => import('@/views/code/index.vue'),
  },
  {
    path: '/d3three2',
    name: 'd3three2',
    component: () => import('@/views/d3three/index.vue'),
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload/index.vue'),
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/index.vue'),
  },
  {
    path: '/liucheng',
    name: 'liucheng',
    component: () => import('@/views/G6/liucheng.vue'),
  },
];
const router = createRouter({
  history,
  routes,
})
export default router
