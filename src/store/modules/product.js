import axios from "axios"
import qs from "qs"
import {product} from "@/services"
import Vue from "vue"
export default {
  namespaced:true,
  state:{
    listData:[],
    count:0,
    pageSize:10,
    pageNum:1
  },
  getters:{
    listData:state=>state.listData,
    totalPage:state=>{
      //计算总页数
      return Math.ceil(state.count/state.pageSize)
    }
  },
  mutations:{
    setListData(state,{listData,count}){
      state.listData = listData
      state.count = count
    },
    //专门修改 页面的 mutation
    changePageNum(state,{currentPage}){
      state.pageNum = currentPage
      console.log(state.pageNum)
    },
    editor(state,{index,data}){
      //vue里面对数组的某些进行修改的时候， this.$set(obj,key,val)
      //state.listData.splice(index,1,data)
      Vue.set(state.listData,index,data)
    }
    // ,
    // delItem(state,{index}){
    //   state.listData.splice(index,1)
    // }
  },
  actions:{
    getListData(context,payload={}){
      console.log(context) 
      const {commit,state} = context;
      const {pageNum,pageSize} = state
      const {keyword,cate_id} = payload

      //整合参数
      var params ={
        cate_id,//分类
        pageNum, //页码
        pageSize,
        keyword//关键字
      }
      //调用 services 模块的方法 获取数据
      product.getListData(params).then(res=>{
        console.log(res.data)
        context.commit("setListData",res.data)
      })
    },
    del(context,{pid,index,succ,fail}){
       //调用 services 模块的方法 删除数据
      let params = {pid}
      product.del(params).then(res=>{
        console.log(res.data)
        if(res.data.msgCode==1){
          //成功
          context.dispatch("getListData")
          succ()
        }else{
          fail()
        }
      })
    },
    add(context,payload){
      product.add(payload).then(res=>{
        console.log(res.data)
      })
    }
  }
}