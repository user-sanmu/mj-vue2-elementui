<template>
  <div class="login-page">
    <el-card>
      <template #header>黑马面经后台管理系统</template>
      <!-- 卡片内容默认插槽,不用嵌套template -->
      <el-form ref="form" :model="user" :rules="rules" label-width="80px">
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="login">登录</el-button>
          <el-button round class="btn" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'

export default {
  name: 'login-page',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required: 必填
          // trigge: 验证时机
          {
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          },
          {
            min: 4,
            max: 6,
            message: '长度在 4 到 6 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 5,
            max: 8,
            message: '长度在 5 到 8 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await loginApi(this.user)
            // console.log(res)
            localStorage.setItem('mj-pc-token', res.data.token)
            this.$message.success('登录成功')
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 1500)
          } catch (err) {
            console.log(err)
            this.$message.error(err.response.data.message)
          }
        }
      })
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center;
  background-size: cover;
  // 使用elementui组件名就是类名
  .el-card {
    width: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 30px;
    transform: translate(-50%, -50%);
    // 使用样式穿透
    ::v-deep .el-card__header {
      text-align: center;
      background-color: #727cf5;
      font-size: 20px;
      color: #fff;
      height: 80px;
      line-height: 40px;
    }
    .el-form {
      padding-right: 60px;
      text-align: center;
    }
    ::v-deep .el-input__inner {
      border-radius: 20px;
    }
  }
}
</style>
