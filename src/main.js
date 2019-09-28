import Vue from "vue"

// 路由：1.导入路由构造函数
import VueRouter from 'vue-router'

//导入vant-ui组件
import Vant from 'vant'
import {
    Toast
} from 'vant'

//导入axios
import axios from 'axios'
// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter)
Vue.use(Vant)

// 把axios挂载到原型
Vue.prototype.$axios = axios

// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = 'http://localhost:3000'

// 导入组件
import App from "@/App";
import Login from "@/pages/Login";
import Register from '@/pages/Register';
import Personal from '@/pages/Personal';

// 路由：2.创建路由配置
const routes = [{
        path: "/login",
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/personal',
        component: Personal
    }
]

// 路由：3.创建对象
const router = new VueRouter({
    routes
});

//判断是否可以跳转到需要登录的页面 路由守卫
router.beforeEach((to,from,next)=>{
    const hasToken = localStorage.getItem('token')
    if(to.path=='/personal'){
        if(hasToken){
            next()
        }else{
            return next('/login')
        }
    }
    next()
})

// axios的统一的拦截器，拦截响应
// 固定的声明
axios.interceptors.response.use(res => {
    const {
        message,
        statusCode
    } = res.data;
    if (statusCode === 401) {
        Toast.fail(message)
    }
    if(message==='用户信息验证失败'){
        router.push('/login')
    }
    // 必须要返回res
    return res;
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