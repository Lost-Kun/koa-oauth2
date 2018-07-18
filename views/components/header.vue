<template>
  <div class="head">
    <img class="system_icon" src="/public/images/navLogo.png"/>
    <div class="system_name">权限管理系统</div>
    <template v-if="!isLogin">
      <div class="user_info">
        <el-dropdown @command="handleCommand">
          <span class="user_info_name">
              {{user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="changePassword">修改密码</el-dropdown-item> -->
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
    <popup :show="popShow"
      @close="close"
      :width="450"
      :height="320"
      :title="'修改密码'">
      <div class="project_info">
        <el-form ref="ruleForm" :model="editPassword" label-width="100px" :rules="rules">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="editPassword.oldPassword"
              maxlength="30"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="editPassword.newPassword"
              maxlength="30"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="newPassword_repeat">
            <el-input
              v-model="editPassword.newPassword_repeat"
              maxlength="30"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="confirm">确定</el-button>
            <el-button size="small" @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </popup>
  </div>
</template>

<script>
import Cookies from 'universal-cookie'
import config from 'config'
import popup from './popup'

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const checkRepeat = (rule, value, callback) => {
      if (this.editPassword.newPassword_repeat === this.editPassword.newPassword) {
        callback()
      } else {
        callback(new Error('新密码不一致'))
      }
    }

    return {
      popShow: false,
      editPassword: {
        oldPassword: '',
        newPassword: '',
        newPassword_repeat: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        newPassword_repeat: [
          { required: true, message: '请重新输入新密码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          { validator: checkRepeat, trigger: 'change' }
        ]
      }
    }
  },
  components: {
    popup
  },
  computed: {
    user_name () {
      return this.$store.state.user.user_name
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'changePassword') {
        this.changePassword()
      }
    },
    changePassword () {
      this.popShow = true
      this.editPassword = {
        oldPassword: '',
        newPassword: '',
        newPassword_repeat: ''
      }
    },
    confirm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm('是否确定修改密码').then(() => {
            const param = {
              oldPassword: this.editPassword.oldPassword,
              newPassword: this.editPassword.newPassword
            }
            this.$http.post('/oauth/user/changePassword', param).then((data) => {
              this.popShow = false
              this.$alert(data.message)
            })
          }).catch(() => {})
        }
      })
    },
    close () {
      this.popShow = false
      this.$refs.ruleForm.clearValidate()
    },
    logout () {
      const cookies = new Cookies()
      this.$ls.remove('user')
      cookies.remove(config.storageNamespace + 'token')
      this.$store.commit('user/SET_VALUE', {})
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.head{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #205081;
}

.system_icon{
  width: 40px;
  height: 24px;
  margin-left: 20px;
}

.system_name{
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
  margin-left: 15px;
  letter-spacing:2px;
}

.nav{
  height: 100%;
  padding: 0 10px;
  font-size: 17px;
  box-sizing: border-box;
  color: #ffffff;
  margin-left: 30px;
  cursor: pointer;
  line-height: 55px;
}

.nav:hover{
  background-color: rgba(0, 0, 0, .4);
}

.user_info{
  position: absolute;
  right: 25px;
}

.user_info_name{
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
}

.project_info{
  position: absolute;
  top: 25px;
  left: -10px;
  right: 30px;
  bottom: 0;
  text-align: center;
}
</style>
