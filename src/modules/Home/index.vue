<template>
  <div>
  <chart :options="polar"></chart>
  </div>

  
</template>
<script>

  import axios from "axios"
  export default {
      data(){
        //vue-echart github 官方的demo不能直接使用
        return {
          polar: {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
          }
        }
      }
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
