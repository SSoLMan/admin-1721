<template>
  <div>
 <el-table
    :data="adData"
    style="width: 100%"
    >
    <el-table-column
      prop="title"
      label="标题"
      width="70">
    </el-table-column>
    <el-table-column
      label="类型"
      width="160">
       <template slot-scope="scope">
          <span style="margin-left: 10px">{{AD_TYPES[scope.row.ad_type] }}</span>
        </template>
    </el-table-column>
    <el-table-column
  
      prop="link"
      label="连接"
      width="300">
    </el-table-column>
     <el-table-column
  
      prop="img_url"
      label="图片"
      width="300">
    </el-table-column>
  
    <el-table-column
      label="操作"
      width="60">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div> <el-button @click="addVisible=true">添加广告</el-button> </div>

  <el-dialog title="添加广告" :visible.sync="addVisible">
     <el-form :model="form">
        <el-form-item label="广告标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告类型" :label-width="formLabelWidth">
          <el-select v-model="form.ad_type" placeholder="请选广告类型">
            <el-option label="首页banner" value="1"></el-option>
            <el-option label="首页楼层" value="2"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="广告连接" :label-width="formLabelWidth">
          <el-input v-model="form.link" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="广告图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img_url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return {
      AD_TYPES:["未知","首页banner","首页楼层"],
      addVisible:false,
      form:{
        title:"",link:"",ad_type:"",img_url:""
      },
      adData:[
        {
          title:"标题",ad_type:1,
          link:"https://www.baidu.com/s?rsv_idx=1&wd=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&usm=1&ie=utf-8&rsv_cq=element&rsv_dl=0_right_recommends_merge_20826&euri=3ad3768e9ef2410f83541687bde37f7f",
          img_url:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1807044973,2529409740&fm=58"
        },
         {
          title:"标题",ad_type:2,
          link:"https://www.baidu.com/s?rsv_idx=1&wd=%E7%BB%8F%E5%85%B8%E8%8B%B1%E6%96%87%E6%AD%8C%E6%9B%B2&usm=1&ie=utf-8&rsv_cq=element&rsv_dl=0_right_recommends_merge_20826&euri=adb6facc38924e90b827cd1c828ae8b4",
          img_url:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1184580348,1586936779&fm=58"
        }
      ]
    }
  },
  methods:{
    deleteRow(index,rowData){
      //rowData.ad_id 删除
    },
    addAD(){

    }
  }
}
</script>


