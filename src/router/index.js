import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '../home/Home'
import Admin from '../components/admin/AdminList'

Vue.use(Router)

const router =  new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      meta: { requireAuth: true },
      component: Home,
      // redirect: '/admin',
      children: [
          { path: '/admin', component: Admin, meta: { requireAuth: true }, },
      ]
  },
  ]
})



router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  let isLogin = window.sessionStorage.getItem('login');
  console.log(isLogin);
    if (isLogin) {
        //如果用户信息存在则往下执行。
        next()
    } else {
        if (to.path === '/login') {
           next()
       } else {
           next('/login')
       }
   } 
})

export default router;
