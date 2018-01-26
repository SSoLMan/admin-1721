<template>
  <div class="product-list">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
        <div slot="prepend">

          <el-select v-model="cate1"  placeholder="请选择">
            <el-option 
            :label="data.cate_name" 
            :value="data.cate_id" 
            :key="data.cate_id"
             v-for="data in cateData"></el-option>
          </el-select>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-select v-model="cate2"  placeholder="请选择">
            <el-option 
            :label="data.cate_name" 
            :value="data.cate_id" 
            :key="data.cate_id"
             v-for="data in cateChildrenData"></el-option>
          </el-select>
        </div>
        <el-button slot="append" @click="searchPro" icon="el-icon-search"></el-button>
      </el-input>
    </div>

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
            @click="handleDelete({index:scope.$index,pid:scope.row.pid})">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 15px;">

      <el-pagination

        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-count="totalPage"
        >
      </el-pagination>

    </div>
    
    <pro-editor ref="editor"></pro-editor>
    
  </div>
</template>
<script>
  import qs from "qs"
  import proEditor from "./Editor.vue"
  import {mapActions,mapGetters} from "vuex"
  export default {
    name:"productList",
    data(){
      return {
       cate1:"",
       cate2:"",
       cateData:[],
       cateChildrenData:[],
       keyword:""
      }
    },
    watch:{
      //监听 1级分类改变，获取对应二级分类 的数据
      cate1(){
        console.log(this.cate1)
        this.getCateData(this.cate1)
        this.cate2 = "" //一级分类改变， 重置二级分类
      }
    },
    computed:{
      ...mapGetters("product",[
        "listData","totalPage"
      ])
    },
    methods:{
      ...mapActions("product",[
        "getListData","del"
      ]),
      currentChange(currentPage){
        console.log(currentPage)
       // this.getListData({currentPage})
        this.$store.commit("product/changePageNum",{currentPage})
        console.log("ok")
        this.getListData() //修改完页码再获取数据
      },
      getCateData(parent_id=0){
        //获取分类数据
        this.axios.get("http://localhost:8000/api/cate/getCateData?parent_id="+parent_id).then(res=>{
          if(parent_id){
            //子类的数据
             this.cateChildrenData = res.data
          }else{
            this.cateData = res.data
          }
        })
      },
      searchPro(){
        //搜索对应的商品  传递参数
        this.getListData({keyword:this.keyword,cate_id:this.cate2})
      },
      handleEdit(index,rowData){
        //想让子组件的 弹窗显示
        this.$refs.editor.show(index,rowData)
      },
      handleDelete(params){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认删除，需要先执行异步的action
          this.del({...params,succ:()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          },fail:()=>{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted(){
      //获取列表数据
      this.getListData()
      this.getCateData()
    },
    components:{
      proEditor
    }
  }
</script>

<style>
 .el-table__header th{ text-align: center}
 .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
