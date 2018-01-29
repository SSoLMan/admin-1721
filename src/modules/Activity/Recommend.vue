<template>

  <div>
    <div>
      <el-transfer
        :titles="['商品列表','推荐列表']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入商品名"
        v-model="values"
        :data="datas">
      </el-transfer>
      <div style="padding-top:10px;">
        <el-button @click="comfirmRecommend">提交</el-button> 
      </div>
    </div>
    <div style="padding-top:100px;">
      <el-transfer
        :titles="['推荐列表','取消推荐']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入商品名"
        v-model="values"
        :data="datas">
      </el-transfer>
      <div style="padding-top:10px;">
        <el-button @click="comfirmRecommend">提交</el-button> 
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs"
export default {

  data() {
      return {
        datas: [],
        values: []
      };
    },
    methods:{
      filterMethod(query, item){
        return item.p_name.indexOf(query) > -1;
      },
      comfirmRecommend(){
        console.log(this.values,this.datas)
        this.axios.post("http://localhost:8000/api/recommend/list",
        qs.stringify({ids:JSON.stringify(this.values)}))
        .then(res=>{
          console.log(res.data)
        })
      }
    },
    mounted(){
      this.axios.get("http://localhost:8000/api/product/getListData").then(res=>{
        res.data.listData.forEach(ele=>{
          ele.key = ele.pid
          ele.label = ele.p_name
        })
        this.datas = res.data.listData
      })
    }
}
</script>

<style>

</style>
