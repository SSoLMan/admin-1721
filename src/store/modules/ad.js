import axios from "axios"
import qs from "qs"
import Vue from "vue"
export default {
  namespaced:true,
  state:{
    listData:[]
  },
  getters:{
    listData:state=>state.listData
  },
  mutations:{
    setListData(state,{listData}){
      state.listData = listData
    }
  },
  actions:{
    getListData(context,payload={}){
      axios.get(`http://localhost:8000/api/ad/getListData`).then(res=>{
  
        context.commit("setListData",{listData:res.data.adData})
      })
    },
    del(context,{ad_id,index}){
      axios.post("http://localhost:8000/api/ad/del",qs.stringify({ad_id})).then(res=>{
        if(res.data.msgCode==1){
          context.dispatch("getListData")
         
        }else{
         
        }
      })
    },
    add(context,payload={}){
      axios.post("http://localhost:8000/api/ad/add",qs.stringify(payload)).then(res=>{
        if(res.data.msgCode==1){
          context.dispatch("getListData")
         
        }else{
        
        }
      })
    }
  }
}