<template>
  <div>
    <el-table
    :data="orderData"
    style="width: 100%">
    <el-table-column
      label="编号"
      width="100">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.order_num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="金额"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.total_sum  }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="收货人"
      width="80">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.mobile }}</p>
          <p>住址: {{ scope.row.detail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.ads_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
      label="商品"
      width="250">
      <template slot-scope="scope">
        <div>
          <div class="pro-item"  v-for="pro in scope.row.productInfo" :key="pro.pid">
            <p class="pro">{{pro.p_name}}</p>
            <p>{{pro.price}}</p>
            <p>{{pro.number}}</p>
          </div>
        </div>
      </template>
    </el-table-column>
      <el-table-column
      label="订单状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ stateTitle[scope.row.state] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <order-btns :state="scope.row.state" :scope="scope"></order-btns> 
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>
<script>
import OrderBtns from "./OrderBtns"
export default {
  data(){
    return {
      orderData:[],
      stateTitle:["未知","未付款","已付款","已发货","带评价","已完成"]
    }
  },
  mounted(){
    this.axios.get("http://localhost:8000/api/order/getListData").then(res=>{
      console.log(res.data)
      this.orderData = res.data.results
    })
  },
  filters:{
    filterState(state){
      switch(state){
        case 1:
        return "未付款"
      }
      return 222
    }
  },
  components:{
    OrderBtns
  }
}
</script>
<style scoped>
.pro-item { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 5px;}
.pro { width: 120px;}
</style>
