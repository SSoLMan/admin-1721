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
              path:"new",component:()=>import("@/modules/Product/Add")
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
              path:"list",component:()=>import("@/modules/Category/List")
            }
          ]
         
        },
        {
          path:"order",
          component:{template:`<router-view></router-view>`},
          children:[
            {
              path:"list",component:()=>import("@/modules/Order/List")
            },
            {
              path:"tui",component:{render(h){return h("div",null,'order tui tui')}}
            }
          ]
         
        },
        
        {
          path:"activity",
          component:{template:`<router-view></router-view>`},
          children:[
            {
              path:"recommend",component:()=>import("@/modules/Activity/Recommend")
            },
            {
              path:"special",component:{render(h){return h("div",null,'order tui tui')}}
            }
          ]
         
        },
        {
          path:"ad",component:()=>import("@/modules/Ad")
        },
      ]
    },
    {
      path:"/login",component:Home
    },
    {
      // 路由 路径输入错，去默认的页面（路由重定向）
      path:"*",
      redirect:"/home"
    }
  ]
})
