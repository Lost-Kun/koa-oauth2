<template>
    <div class="login">
        <div class="login_title">
            <myheader :is-login="true"></myheader>
        </div>
        <div class="login_body">
          <div class="login_box">
            <div class="login_box_form">
              <el-form ref="ruleForm" :model="userInfo" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model="userInfo.username"
                    @keyup.enter.native="login"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="userInfo.password"
                    type="password"
                    @keyup.enter.native="login"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    @click="login"
                    style="width:100px;font-size:15px;"
                  >登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import myheader from '../components/header'

export default {
  components: {
    myheader
  },
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // ajax登录
          this.$http.post('/oauth/user/login', {
            name: this.userInfo.username.replace(/(^\s*)|(\s*$)/g, ''),
            password: this.userInfo.password
          }).then((data) => {
            this.$store.commit('user/SET_VALUE', data)
            this.$ls.set('user', data)
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  position: relative;
  height: 100%;
}

.login_title{
  height: 50px;
}

.login_body{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login_box{
  width: 500px;
  height: 300px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #ccc;
  background-color: #ffffff;
}

.login_box_form{
  width: 400px;
  margin-left:23px;
  margin-top:85px;
}
</style>
