import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/components/home'
// import About from '@/components/about'

// 路由懒加载
const Home = () => import('@/components/Home')
const HomeNews = () => import('@/components/HomeNews')
const HomeMessage = () => import('@/components/HomeMessage')

const About = () => import('@/components/About')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'news'
        },
        {
          path: 'news',
          component: HomeNews
        },
        {
          path: 'message',
          component: HomeMessage
        }
      ],
      // 元数据
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      component: About,
      // 元数据
      meta: {
        title: '关于'
      }
    }
  ]
})

// 导航首位：监听导航的变化
// 【前置守卫】guard
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})
// 【后置钩子】hook
router.afterEach((to, from) => {

})

export default router
