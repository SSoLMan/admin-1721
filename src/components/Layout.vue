<template>
<div class="">
  <el-container>
    <el-header class="lm-header">
      <lm-header></lm-header> 
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <side-menu></side-menu >  
      </el-aside>
      <el-container>
        <el-main class="content">
          <transition name="el-zoom-in-center">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
import lmHeader from "./Header"
import sideMenu from "./SideMenu"
export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    sideMenu,lmHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lm-header { background: rgb(67, 74, 80); color: #fff}
.content {  min-height: 500px;}
.aside {background-color: rgb(84, 92, 100)}
</style>
