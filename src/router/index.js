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
          path:"home",component:Home
        },
        {
          path:"product_add",component:Product
        },
        {
          path:"product_list",component:{
            render(h){ return h("div",null,"product_list")}
          }
        },
        {
          path:"cate_add",component:{
            template:"<div>cate_add</div>"
          }
        },
        {
          path:"cate_list",component:{
            render(h){ return <div>cate_list</div>}
          }
        },
      ]
    },{
      // 路由 路径输入错，去默认的页面（路由重定向）
      path:"*",
      redirect:"/home"
    }
  ]
})
