<template>
  <div class="">
    <a href="#/" class="logo">logo</a>

    <div class="header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="pic" src="../assets/pic.jpg" alt="">
          <span>木木木</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改信息</el-dropdown-item>
          <el-dropdown-item>消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo { color: #fff; height: 100%; float: left; line-height: 60px;font-size: 30px; padding: 0 50px;}
.header-right { float: right;height: 100%;}
.el-dropdown-link { color: #fff; display: block}
.pic { height: 40px; width: 40px; border-radius: 50%; margin: 5px;}
.el-dropdown-link .pic, .el-dropdown-link span, .el-dropdown-link i { float: left; line-height: 60px;}
</style>
