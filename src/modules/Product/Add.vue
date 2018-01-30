<template>
  <div>
    <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
     
      <el-form-item label="商品名称">
         <el-input v-model="productData.p_name" ></el-input>
      </el-form-item> 
       <el-form-item label="价格">
         <el-input v-model="productData.price" ></el-input>
      </el-form-item> 
       <el-form-item label="数量">
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
      <el-form-item>

        <el-upload
          :action="imgUploadUrl"
          list-type="picture-card"
          name="roompic"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>
      <el-form-item>
        <vue-editor v-model="productData.desc"
         useCustomImageHandler
         @imageAdded="handleImageAdded" 
        ></vue-editor>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {imgServerUrl,imgUploadUrl} from "@/services/config"
import {cate} from "@/services"
import {VueEditor} from "vue2-editor"
import {mapActions} from "vuex"
import qs from "qs"
  export default {
    data(){
      return {
        imgUploadUrl,imgServerUrl,
        productData:{
          p_name:"",
          price:"",
          total_number:"",
          parent_id:"",
          cate_id:"",
          img_url:"",
          img_list:[],
          desc:""
        },
        cateData:[],
        cateChildrenData:[],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods:{
      ...mapActions("product",[
        "add"
      ]),
       getCateData(parent_id=0){
        //获取分类数据  cate是 services模块的获取分类数据的模块
        cate.getCateData({parent_id}).then(res=>{
          if(parent_id){
            //子类的数据
             this.cateChildrenData = res.data
          }else{
            this.cateData = res.data
          }
        })
      },
      //富文本编辑器的图片上传
      handleImageAdded(file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        var formData = new FormData();//formData对象 （是formData对象传递文件数据）
        formData.append('roompic', file) //添加一个字段和， 值（图片）

        this.axios({
          url:this.imgUploadUrl,
          method: 'POST',
          data: formData
        })
        .then((res) => {
          //富文本编辑器上传图片成功

          // Get url from response
          let url = this.imgServerUrl + res.data.imgSrc.replace("public","") 
          console.log(url)
          Editor.insertEmbed(cursorLocation, 'image', url); //给文本编辑器里面插入图片
        })
        .catch((err) => {
          console.log(err);
        })
      },

      //图片列表上传的相关方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //图片上传成功
      handleAvatarSuccess(res,file){
        console.log(res)
        //保存url
        this.productData.img_url = this.imgServerUrl+res.imgSrc.replace("public","")
        //可能有多个图片，需要把图片存在数组里面
        this.productData.img_list.push(this.productData.img_url)
      },
      //提交商品信息
      submitForm(){
        console.log(this.productData)
        //添加商品的数据
        var params ={...this.productData,start_time: Math.round(new Date().getTime()/1000)}
        //调用action 方法
        this.add(params)
      },
      resetForm(){
        Object.keys(this.cateData).forEach(key=>{
          //this.cateData[key] = ""
        })
      }
    },
    mounted(){
      this.getCateData()
    },
    components:{
      VueEditor
    }
  }
</script>

<style>
.el-form-item__content { text-align: left}
.cate-item { width: 200px;}
</style>
