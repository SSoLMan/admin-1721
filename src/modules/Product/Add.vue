<template>
  <div>
    <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
     
      <el-form-item label="商品名称">
         <el-input v-model="productData.p_name" ></el-input>
      </el-form-item> 
       <el-form-item label="价格">
         <el-input v-model="productData.price" ></el-input>
      </el-form-item> 
       <el-form-item label="数据">
         <el-input v-model="productData.total_number" ></el-input>
      </el-form-item> 
      <el-form-item label="选择一级分类">
         <el-select v-model="productData.parent_id" placeholder="请选择"
          @change="getCateData(productData.parent_id)">
          <el-option
            v-for="item in cateData"
            :key="item.cate_id"
            :label="item.cate_name"
            :value="item.cate_id">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="选择二级分类">
         <el-select v-model="productData.cate_id" placeholder="请选择">
          <el-option
            v-for="item in cateChildrenData"
            :key="item.cate_id"
            :label="item.cate_name"
            :value="item.cate_id">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item>
      
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8000/api/uploadImg"
          :show-file-list="false"
          name="roompic"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>   -->


      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import qs from "qs"
  export default {
    data(){
      return {
        productData:{
          p_name:"",
          price:"",
          total_number:0,
          parent_id:"",
          cate_id:""
          
        },
        cateData:[],
        cateChildrenData:[]
      }
    },
    methods:{
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
      submitForm(){
     
      },
      resetForm(){
        Object.keys(this.cateData).forEach(key=>{
          //this.cateData[key] = ""
        })
      }
    },
    mounted(){
      this.getCateData()
    }
  }
</script>

<style>
.el-form-item__content { text-align: left}
.cate-item { width: 200px;}
</style>
