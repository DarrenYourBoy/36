import Vue from "vue"

// 路由：1.导入路由构造函数
import VueRouter from 'vue-router'

//导入vant-ui组件
import Vant from 'vant'

//导入axios
import axios from 'axios'
// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter)
Vue.use(Vant)

// 把axios挂载到原型
Vue.prototype.$axios = axios
// 导入组件
import App from "@/App";
import Login from "@/pages/Login";

// 路由：2.创建路由配置
const routes = [{
    path: "/login",
    component: Login
}]

// 路由：3.创建对象
const router = new VueRouter({
    routes
});

new Vue({
    el: "#app",
    // data: {
    //     message: "hello webpack and vue!"
    // }
    render(createElement) {
        return createElement(App)
    },
    router,
})