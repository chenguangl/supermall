import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'
import Category from 'views/category/Category.vue'
import Cart from 'views/cart/Cart.vue'
import Profile from 'views/profile/Profile.vue'
import Detail from 'views/detail/Detail.vue'

// 全局注册路由
Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

]
export default new Router({
  routes,
  mode: 'history'
})

