<template>

  <div>
    <div>
      <el-transfer
        :titles="['商品列表','添加推荐']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入商品名"
        v-model="addIds"
        :data="productData">
      </el-transfer>
      <div style="padding-top:10px;">
        <el-button @click="comfirmAdd">提交</el-button> 
      </div>
    </div>
    <div style="padding-top:100px;">
      <el-transfer
        :titles="['推荐列表','取消推荐']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入商品名"
        v-model="delIds"
        :data="listData">
      </el-transfer>
      <div style="padding-top:10px;">
        <el-button @click="comfirmDel">提交</el-button> 
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions,mapGetters} from "vuex"

export default {
  data() {
      return {
        addIds: [],
        delIds: []
      };
    },
    computed:{
      ...mapGetters("recommend",[
        "listData","productData"
      ])
     
    },
    methods:{
      ...mapActions("recommend",[
        "add","getListData","del","getProductData"
      ]),
     
      filterMethod(query, item){
        return item.p_name.indexOf(query) > -1;
      },
      comfirmAdd(){
        this.add({ids:JSON.stringify(this.addIds)})
        setTimeout(()=>{
          this.addIds = []
        })
      },
      comfirmDel(){
        this.del({ids:JSON.stringify(this.delIds)})
        setTimeout(()=>{
          this.delIds = []
        })
      }
    },
    mounted(){
      this.getListData()
      this.getProductData()
    }
}

</script>

<style>

</style>
