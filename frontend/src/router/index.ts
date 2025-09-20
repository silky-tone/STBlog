import { createRouter, createWebHistory } from 'vue-router';
import { useUser } from '../store';
import NProgress from 'nprogress';
import type { App } from 'vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/sign',
      redirect: '/sign/login',
      component: () => import('../views/sign/page.vue'),
      children: [
        { path: 'login', name: 'login', meta: { title: '登录' }, component: () => import('../views/sign/login/page.vue') },
        { path: 'register', name: 'register', meta: { title: '注册' }, component: () => import('../views/sign/register/page.vue') },
      ],
    },
    { path: '/', beforeEnter: appBeforeEach, component: appHandlerLayout },
    { path: '/:chapters*', name: '404', meta: { title: '404' }, component: () => import('../views/error/404.vue') },
  ],
});

// TODO: 页面路由
function appBeforeEach() {
  console.log('appBeforeEach');
}

// TODO: 主题切换实现
async function appHandlerLayout() {
  console.log('handler Layout');
  return await import('../views/layout/default.vue');
}

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, _, next) => {
  NProgress.start();

  // 判断 - 未登录
  if (!useUser().isLogin) {
    // 判断 - 非(登录/注册)页面
    if (to.path.indexOf('/sign') < 0) {
      return next({ path: '/sign/login' });
    }
  }

  next();
});

router.afterEach(() => {
  setTimeout(() => NProgress.done(), 300);
});

// 登录，注册，用户管理，角色管理，权限管理，菜单管理，文件管理，日志管理，系统设置，邮件管理，文章管理，评论管理，友链管理，标签管理，分类管理，页面管理，仪表盘
// children: [
//   { path: '/dashboard', component: () => import('../views/dashboard/page.vue') },
//   { path: '/login', component: () => import('../views/login/page.vue') },
//   { path: '/register', component: () => import('../views/register/page.vue') },
//   { path: '/user', component: () => import('../views/user/page.vue') },
//   { path: '/role', component: () => import('../views/role/page.vue') },
//   { path: '/permission', component: () => import('../views/permission/page.vue') },
//   { path: '/menu', component: () => import('../views/menu/page.vue') },
//   { path: '/file', component: () => import('../views/file/page.vue') },
//   { path: '/log', component: () => import('../views/log/page.vue') },
//   { path: '/system', component: () => import('../views/system/page.vue') },
//   { path: '/email', component: () => import('../views/email/page.vue') },
//   { path: '/article', component: () => import('../views/article/page.vue') },
//   { path: '/comment', component: () => import('../views/comment/page.vue') },
//   { path: '/friend', component: () => import('../views/friend/page.vue') },
//   { path: '/tag', component: () => import('../views/tag/page.vue') },
//   { path: '/category', component: () => import('../views/category/page.vue') },
//   { path: '/page', component: () => import('../views/page/page.vue') },
// ],

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
