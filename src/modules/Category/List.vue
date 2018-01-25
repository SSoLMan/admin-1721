<template>
  <div class="cate-list">
     <el-table
     class="tb"
    :data="cateData"
    style="width: 100%">
    <el-table-column
      label="分类id"
      width="100">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.cate_id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类名称"
      width="150">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.cate_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="父级分类id"
      width="100">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.parent_id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类图标"
      width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.cate_img }}</span>
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
  </div>
</template>
<script>
  export default {
    name:"cateList",
    data(){
      return {
        cateData:[{
          cate_id:19,
          cate_name:"服装",
          parent_id:1,
          cate_img:"222"
        },{
          cate_id:14,
          cate_name:"服装2",
          parent_id:1,
          cate_img:"222"
        }]
      }
    },
    methods:{
      handleEdit(){

      },
      handleDelete(){

      }
    }
  }
</script>

<style>
.cate-list th {text-align: center}
</style>
