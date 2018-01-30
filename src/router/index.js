import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Home from '@/modules/Home'
import axios from "axios"
// import CateAdd from '@/modules/Category/Add'
Vue.use(Router)
//require.js    webpack   commonjs   amd
const router =  new Router({
  mode:"history",
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
              path:"list",
              component:()=>import("@/modules/Order/List"),
              meta:{
                requiresAuth:true
              }
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
          path:"ad",component:()=>import("@/modules/Ad"),meta:{
            requiresAuth:true
          }
        },
      ]
    },
    {
      path:"/login",component:()=>import("@/modules/User/Login"),meta:{
        noAuth:true //不需要鉴权的判断
      }
    },
    {
      // 路由 路径输入错，去默认的页面（路由重定向）
      path:"*",
      redirect:"/home"
    }
  ]
})


//在进入每个页面之前，判断用户权限 （鉴权）
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    var token = window.localStorage.getItem("token") //获取token
    axios.get("http://localhost:8000/api/requiresAuth?token="+token).then(res=>{
      console.log(res.data)
      if(res.data.msgCode==1){
        next()
      }else {
        next({
          path:"/login",
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router