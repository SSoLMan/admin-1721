<template>
  <div>
    
home
  
  </div>

  
</template>
<script>

  import axios from "axios"
  export default {
      data(){
        return {

        }
      },
      // beforeRouteEnter (to, from, next) {
      //   console.log(to,from,next)
      //   // 在渲染该组件的对应路由被 confirm 前调用
      //   // 不！能！获取组件实例 `this`
      //   // 因为当守卫执行前，组件实例还没被创建
      //   var token = window.localStorage.getItem("token")
      //   axios.get("http://localhost:8000/api/requiresAuth?token="+token).then(res=>{
      //     console.log(res.data)
      //     if(res.data.msgCode==1){
      //       next()
      //     }else {
      //        next({path:"/login"})
      //     }
      //   })
        
      // }
  }
</script>
<style>

</style>
