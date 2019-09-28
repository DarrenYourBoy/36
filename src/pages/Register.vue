<template>
  <div class="container">
    <!-- 关闭的按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名密码输入框 -->
    <div class="inputs">
      <div>
        <AuthInput
          placeholder="电话号码"
          :value="form.username"
          @input="handleUsername"
          :rule="/^1[0-9]{4,10}$/"
          err_message="手机号码格式不正确"
        ></AuthInput>
      </div>    
      <div class="name">
        <AuthInput
          placeholder="昵称"
          v-model="form.nickname"
          :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
          err_message="昵称格式不正确"
        ></AuthInput>
      </div>
      <div>
        <AuthInput
          placeholder="密码"
          v-model="form.password"
          :rule="/^[0-9a-zA-Z]{3,12}$/"
          err_message="密码格式不正确"
        ></AuthInput>
      </div>
    </div>
    <div class="goLoginbox">
      已有账户？
      <span>
        <router-link to="/login">去登录</router-link>
      </span>
    </div>
    <AuthButton text="注册" @click="handleSubmit" class="register"></AuthButton>
  </div>
</template>

<script>
//导入组件
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname:""
      }
    };
  },
  components: {
    AuthInput,
    AuthButton
  },
  methods: {
    handleUsername(value) {
      this.form.username = value;
    },
    handleSubmit() {
      this.$axios({
        url: "/register",
        method: "POST", // method相当于type
        data: this.form
        // .then的回调函数相当于success
      }).then(res => {
        const { message } = res.data;
        if(message==='注册成功'){
            this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
// lang声明样式的类型
.container {
  padding: 20px;
  .register {
    font-size: 18px;
  }
  .close {
    span {
      font-size: 27 / 360 * 100vw;
    }
  }
  .goLoginbox {
    margin-bottom: 20px;
    font-size: 14px;
    text-align: right;
    span {
      color: #2319dc;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    span {
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }
  .inputs {
    .input {
      margin-bottom: 20px;
    }
  }
}
</style>