<template>
  <div class="login-page">
    <div class="login-box">
      <el-form :label-position="labelPosition" label-width="80px" >
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs"
export default {
   data() {
      return {
        labelPosition: 'right',
        form: {
          username: '',
          password: ''
        }
      };
    },
     methods: {
      submitForm(formName) {
        this.axios.post("http://localhost:8000/api/user/login",qs.stringify(this.form)).then(res=>{
          console.log(res.data)
          if(res.data.msgCode==1){
            //保存token
            window.localStorage.setItem("token",res.data.token)
            var path = this.$route.query.redirect||"/" //从哪里，回哪去
            this.$router.push({path}) 
          }
        })
      },
      resetForm(formName) {
        
      }
    },
    mounted(){
      console.log(this.$route)
    }
}
</script>
<style>
.login-page { background: #ccc; position: absolute; left: 0; top:0; bottom: 0; right: 0;}
.login-box { width: 400px;background: #fff; padding: 40px; margin: 100px auto}

</style>
