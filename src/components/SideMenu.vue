<template>
  <div class=""> 
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">Home</span>
          </el-menu-item>
          <el-submenu index="product">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="/product/new">新品上架</el-menu-item>
              <el-menu-item index="/product/list">管理商品</el-menu-item>
          </el-submenu>

           <el-submenu index="cate">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>分类管理</span>
              </template>
                <el-menu-item index="/cate/add">添加分类</el-menu-item>
                <el-menu-item index="/cate/list">管理分类</el-menu-item>
            </el-submenu>
             <el-submenu index="order">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>订单管理</span>
              </template>
                <el-menu-item index="/order/list">管理订单</el-menu-item>
                <el-menu-item index="/order/tui">
                   <i class="el-icon-menu"></i>
                   <span slot="title">退换货</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="activity">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>活动管理</span>
              </template>
                <el-menu-item index="/activity/recommend">推荐商品</el-menu-item>
                <el-menu-item index="/activity/hui">优惠特卖</el-menu-item>
            </el-submenu>
            <el-menu-item index="/ad">
              <i class="el-icon-menu"></i>
              <span slot="title">广告位管理</span>
            </el-menu-item>
        </el-menu>
     
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      activeIndex: "home"
    }
  },
  methods: {
    handleSelect(index,indexPath){
      console.log(index,indexPath); //indexPath:[父级的index,自己的index]
      //编程式路由跳转
     // this.$router.push({ path: index, query: { plan: 'private' }})//,params:{}
    }
  },
  mounted(){
    this.activeIndex = this.$route.path
    console.log(this.$route.path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
