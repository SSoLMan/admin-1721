import qs from "qs"
import axios from "axios"
//常量
const baseUrl = "http://localhost:8000/api"
const imgUploadUrl = "http://localhost:8000/api/uploadImg"
const imgServerUrl = "http://localhost:8000"

const http = {
  get(url,params){
    //  /product/getListData
    return axios.get(baseUrl+url+"?"+qs.stringify(params)).catch(err=>console.log(err))
  },
  post(url,params){
    return axios.post(baseUrl+url,qs.stringify(params)).catch(err=>console.log(err))
  }
}

export {http,baseUrl,imgServerUrl,imgUploadUrl}

