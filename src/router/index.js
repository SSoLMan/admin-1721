import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Home from '@/modules/Home'


// import CateAdd from '@/modules/Category/Add'
Vue.use(Router)
//require.js    webpack   commonjs   amd
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
          path:"product",
          component:{template:`<router-view></router-view>`},
          children:[
            {
              path:"add",component:{render(h){return h("div",null,'add add add')}}
            },
            {
              path:"list",component:()=>import("@/modules/Product")
            }
          ]
        },
        {
         
          path:"cate",
          component:{template:`<router-view></router-view>`},
          children:[
            {
              path:"add",component:()=>import("@/modules/Category/Add")
            },
            {
              path:"list",component:{render(h){return h("div",null,'cate list list')}}
            }
          ]
         
        },
        {
          path:"order",
          component:{template:`<router-view></router-view>`},
          children:[
            {
              path:"list",component:{render(h){return h("div",null,'order add add')}}
            },
            {
              path:"tui",component:{render(h){return h("div",null,'order tui tui')}}
            }
          ]
         
        }
      ]
    },{
      // 路由 路径输入错，去默认的页面（路由重定向）
      path:"*",
      redirect:"/home"
    }
  ]
})
