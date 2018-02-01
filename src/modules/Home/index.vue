<template>
  <div>
    <chart :options="option2" style="width:100%" :auto-resize="true"></chart>
    <chart :options="option1" style="width:100%" :auto-resize="true"></chart>
    <div class="polar">
      <chart :options="polar"  style="width:100%" :auto-resize="true"></chart>
    </div>
  </div>

  
</template>
<script>
  var option1 = {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          x: 'left',
          data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
          {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]
          }
      ]
  };
   var  option2 = {
      title: {
          text: '堆叠区域图'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
              name:'视频广告',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
              name:'直接访问',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              areaStyle: {normal: {}},
              data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
      ]
  };
  import axios from "axios"
  export default {
      data(){
         let data = []

          for (let i = 0; i <= 360; i++) {
              let t = i / 180 * Math.PI
              let r = Math.sin(2 * t) * Math.cos(2 * t)
              data.push([r, i])
          }
        //vue-echart github 官方的demo不能直接使用
        return {
          option1,option2,
          polar:{
            title: {
              text: '极坐标双数值轴'
            },
            legend: {
              data: ['line']
            },
            polar: {
              center: ['50%', '54%']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            angleAxis: {
              type: 'value',
              startAngle: 0
            },
            radiusAxis: {
              min: 0
            },
            series: [
              {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
              }
            ],
            animationDuration: 2000
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
.echarts {}
.polar {width:50%}
</style>
