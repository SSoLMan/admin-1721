import axios from "axios"
import qs from "qs"

export default {
  namespaced:true,
  state:{
    listData:[],
    count:0,
    pageSize:10,
    pageNum:1,
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
    }
  },
  actions:{
    getListData(context){
      console.log(context) 
      const {commit,state} = context;
      const {pageNum,pageSize} = state
   
      axios.get(`http://localhost:8000/api/product/getListData?pageNum=${pageNum}&pageSize=${pageSize}`).then(res=>{
        console.log(res.data)
        context.commit("setListData",res.data)
      })
    }
  }
}