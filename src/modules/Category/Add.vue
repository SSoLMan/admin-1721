<template>
  <div>
    <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称">
        <el-input type="text" v-model="cateData.cate_name" class="cate-item"></el-input>
      </el-form-item>

      <el-form-item label="选择父类">
         <el-select v-model="cateData.parent_id" placeholder="请选择">
          <el-option
            v-for="item in cateList"
            :key="item.cate_id"
            :label="item.cate_name"
            :value="item.cate_id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <!-- 图片上传 http://localhost:8000/admin/uploadImg-->
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
      </el-form-item>  


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
        cateData:{
          cate_name:"",
          parent_id:"",
          cate_img:""
        },
       imageUrl:"",
       cateList:[]
      }
    },
    methods:{
      submitForm(){
        this.axios.post("http://localhost:8000/api/cate/add",qs.stringify(this.cateData)).then(res=>{
          console.log(res.data)
        })
        console.log(this.cateData,this.imageUrl)
      },
      resetForm(){
        Object.keys(this.cateData).forEach(key=>{
          this.cateData[key] = ""
        })
      },
      handleAvatarSuccess(res, file) {
        console.log(res,file,)
       // res.imgSrc :  "public/images/files/jPkCA3ywEojt6nkZnILMsXmJ.jpg"
        this.cateData.cate_img = "http://localhost:8000"+res.imgSrc.replace("public","")
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        //可以现在文件/图片的格式
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      }
    },
    mounted(){
      this.axios.get("http://localhost:8000/api/cate/getCateData").then(res=>{
        this.cateList = res.data
      })
    }
  }
</script>

<style>
.el-form-item__content { text-align: left}
.cate-item { width: 200px;}
</style>
