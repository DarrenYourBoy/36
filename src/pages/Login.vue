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
          placeholder="用户名/手机号码"
          :value="form.username"
          @input="handleUsername"
          :rule="/^1[0-9]{4,10}$/"
          err_message="手机号码格式不正确"
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
    <AuthButton text="登录" @click="handleSubmit"></AuthButton>
  </div>
</template>

<script>
// 导入请求库
import axios from "axios";

//导入组件
import AuthInput from "@/component/AuthInput";
import AuthButton from "@/component/AuthButton";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
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
      axios({
        url: "http://localhost:3000/login",
        method: "POST", // method相当于type
        data: this.form
        // .then的回调函数相当于success
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
// lang声明样式的类型
.container {
  padding: 20px;
  .close {
    span {
      font-size: 27 / 360 * 100vw;
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