<template>
    <div>
      <el-button v-if="state==2"
          size="mini"
          @click="handleSend(scope.$index, scope.row)">发货
      </el-button>
      <el-button v-if="state==6"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">售后
      </el-button>

      <el-button
        size="mini"
        type="danger"
        @click="handleDetail(scope.$index, scope.row)">详情</el-button>


        <el-dialog title="填写物流信息" :visible.sync="sendVisible">
         <el-form :model="form">
          
            <el-form-item label="物流选择" >
              <el-select v-model="form.type" placeholder="请选物流类型">
                <el-option label="顺丰" value="shunfeng"></el-option>
                <el-option label="ems" value="ems"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流单号" >
              <el-input v-model="form.num" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sendVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmSend">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs"
export default {
  data(){
    return {
      sendVisible:false,
      form:{
        type:"",
        num:""
      }
    }
  },
  props:{
    state:Number,
    scope:Object
  },
  methods:{
    handleSend(){
      this.sendVisible = true
    },
    confirmSend(){
      console.log(this.form,this.scope.row.order_id)
      const params = qs.stringify({
        ...this.form,order_id:this.scope.row.order_id
      })

      this.axios.post("http://localhost:8000/api/order/send",params).then(res=>{
        console.log(res)
        this.$message({
          message: '发货成功',
          type: 'success'
        })
      }).catch(err=>{
        console.log(err)
         this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
      this.sendVisible = false
    },
    handleDetail(){

    }        
  }

}
</script>

