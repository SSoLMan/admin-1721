<template>
  <div class="cate-list">
     <el-table
     class="tb"
    :data="listData"
    style="width: 100%">
    <el-table-column
      label="id"
      width="60">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.pid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="150">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.p_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="100">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="销量"
      width="80">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.seller_number }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="库存"
      width="80">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.total_number }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="上架时间"
      width="80">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


  <div>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-count="totalPage"
      >
    </el-pagination>

  </div>
  </div>
</template>
<script>
  import {mapActions,mapGetters} from "vuex"
  export default {
    name:"productList",
    data(){
      return {
       a:1
      }
    },
    computed:{
      ...mapGetters("product",[
        "listData","totalPage"
      ])
    },
    methods:{
      ...mapActions("product",[
        "getListData"
      ]),
      currentChange(currentPage){
        console.log(currentPage)
       // this.getListData({currentPage})
        this.$store.commit("product/changePageNum",{currentPage})
        console.log("ok")
        this.getListData() //修改完页码再获取数据
      },
      handleEdit(){

      },
      handleDelete(){

      }
    },
    mounted(){
      //获取列表数据
      this.getListData()
    }
  }
</script>

<style>
.el-table__header th{ text-align: center}
</style>
