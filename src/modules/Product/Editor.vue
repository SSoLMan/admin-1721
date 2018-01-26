<template>
  <div>
  <el-dialog title="编辑商品数据" :visible.sync="editorVisible">  
    
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
          class="upload-demo"
          action="http://localhost:8000/api/uploadImg"
           name="roompic"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      

      </el-form-item>
      <el-form-item>
        <vue-editor v-model="productData.detail_desc"
         useCustomImageHandler
         @imageAdded="handleImageAdded" 
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    
</el-dialog>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor"
import qs from "qs"
  export default {
    data(){
      return {
        editorVisible:false,
        productData:{
          p_name:"",
          price:"",
          total_number:"",
          parent_id:"",
          cate_id:"",
          img_url:"",
          img_list:[],
          detail_desc:""
        },
        cateData:[],
        cateChildrenData:[],
        index:0
      }
    },
    computed:{
      fileList(){
        var arr = []
        this.productData.img_list.length && (arr = this.productData.img_list.map((ele,index)=>{
          return {
            name:"pic"+(index+1),
            url:ele
          }
        }))
        return arr
      }
    },
    methods:{
      show(index,rowData){
        //rowData 要编辑的数据
        this.editorVisible = true
        console.log(rowData)
        if(rowData.img_list!="undefined"&&rowData.img_list){
           rowData.img_list =JSON.parse(rowData.img_list)
        }else {
          rowData.img_list = []
        }
        this.productData = rowData
        this.index =index
        //需要获取当前二级分类的数据
        console.log(this.productData)
        this.getCateData(this.productData.parent_id)
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
      //富文本编辑器的图片上传
      handleImageAdded(file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        var formData = new FormData();//formData对象 （是formData对象传递文件数据）
        formData.append('roompic', file) //添加一个字段和， 值（图片）

        this.axios({
          url: 'http://localhost:8000/api/uploadImg',
          method: 'POST',
          data: formData
        })
        .then((res) => {
          //富文本编辑器上传图片成功

          // Get url from response
          let url = "http://localhost:8000"+res.data.imgSrc.replace("public","") 
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
      handlePreview(file) {
        console.log(file);
      },
      //图片上传成功
      handleAvatarSuccess(res,file){
        console.log(res)
        //保存url
        this.productData.img_url = "http://localhost:8000"+res.imgSrc.replace("public","")
        //可能有多个图片，需要把图片存在数组里面
        this.productData.img_list.push(this.productData.img_url)
      },
      //提交商品信息
      submitForm(){
        console.log(this.productData)
        this.editorVisible = false
        var params = qs.stringify(this.productData)
        this.axios.post("http://localhost:8000/api/product/editor",params).then(res=>{
          console.log(res.data)
          //if(res.data.msgCode==1){
            //数据库跟新完成
            this.$store.commit("product/editor",{index:this.index,data:this.productData})
         // }
        })
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
