import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

let arrs = require.context('../views', false, /\.vue$/).keys()

arrs = arrs
  .map(v => v.substring(2))
  .filter(v => v !== 'Home.vue')
  .map(v => ({
    path: `/${v.substring(0, v.length - 4)}`,
    name: `${v.substring(0, v.length - 4)}`,
    component: (resolve) => require([`@/views/${v}`], resolve)
  }))

console.log(arrs)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home'),
    children: arrs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
