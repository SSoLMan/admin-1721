<template>
<div class="">
  <el-container>
    <el-header >Header</el-header>
    <el-container>
      <el-aside  width="200px">Aside</el-aside>
      <el-container>
        <el-main>

          <div></div>

        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>


export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
