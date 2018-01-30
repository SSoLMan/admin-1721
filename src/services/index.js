// 和数据库/后端 对接的程序

import {http} from "./config"

const product = {
  getListData(params){
    return http.get("/product/getListData",params)
  },
  del(params){
    return http.post("/product/del",params)
  },
  add(params){
    return http.post("/product/add",params)
  }
}

const ad = {
  getListData(params){
    return http.get("/ad/getListData",params)
  }
}


const order = {
  getListData(params){
    return http.get("/order/getListData",params)
  }
}


const home = {
  getListData(params){
    return http.get("/home/getListData",params)
  }
}


export {product,cate,home,order,ad}