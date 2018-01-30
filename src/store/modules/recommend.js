import axios from "axios"
import qs from "qs"
import Vue from "vue"
export default {
  namespaced:true,
  state:{
    listData:[],
    productData:[]
  },
  getters:{
    productData:state=>{
      return state.productData.map(ele=>{
        var disabled = false;
        state.listData.forEach(rec=>{
          if(rec.pid==ele.pid){
            disabled = true
          }
        })
        return {
          ...ele,
          key:ele.pid,
          label:ele.p_name,
          disabled
        }
      })
    },
    listData:state=>{
      return state.listData.map(ele=>{
        return {
          ...ele,
          key:ele.rec_id,
          label:ele.p_name
        }
      })
    }
  },
  mutations:{
    setListData(state,{listData}){
      state.listData = listData
    },
    setProductData(state,{listData}){
      state.productData = listData
    },
  },
  actions:{
    getProductData(context,payload={}){
      axios.get(`http://localhost:8000/api/product/getListData`).then(res=>{
        context.commit("setProductData",{listData:res.data.listData})
      })
    },
    getListData(context,payload={}){
      axios.get(`http://localhost:8000/api/recommend/getListData`).then(res=>{
  
        context.commit("setListData",{listData:res.data.recommendData})
      })
    },
    del(context,{ids,index}){
      axios.post("http://localhost:8000/api/recommend/del",qs.stringify({ids})).then(res=>{
        if(res.data.msgCode==1){
          context.dispatch("getListData")
         
        }else{
         
        }
      })
    },
    add(context,payload={}){
      axios.post("http://localhost:8000/api/recommend/add",qs.stringify(payload)).then(res=>{
        if(res.data.msgCode==1){
          context.dispatch("getListData")
         
        }else{
        
        }
      })
    }
  }
}