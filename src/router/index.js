import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Home from '@/modules/Home'
import Product from '@/modules/Product'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      // 子路由配置
      children:[
        {
          path:"",component:Home
        },
        {
          path:"product",component:Product
        }
      ]
    }
  ]
})
