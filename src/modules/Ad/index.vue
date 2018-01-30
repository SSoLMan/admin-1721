<template>
  <div>
 <el-table
    :data="listData"
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
          @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAd">确 定</el-button>
      </div>
  </el-dialog>

  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
  computed:{
    ...mapGetters("ad",[
      "listData"
    ])
  },
  data(){
    return {
      formLabelWidth:"120px",
      AD_TYPES:["未知","首页banner","首页楼层"],
      addVisible:false,
      form:{
        title:"",link:"",ad_type:"",img_url:""
      }
    }
  },
  methods:{
    ...mapActions("ad",[
      "add","getListData","del"
    ]),
    deleteRow(index,rowData){
      //rowData.ad_id 删除
      this.del({index,ad_id:rowData.ad_id})
    },
    addAd(){
      this.addVisible = false
      this.add(this.form)
    }
  },
  mounted(){
    this.getListData()
  }

}
</script>


