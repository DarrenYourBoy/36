import Vue from "vue"
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

new Vue({
    el: "#app",
    // data: {
    //     message: "hello webpack and vue!"
    // }
    render(createElement){
        return createElement(App)
    }
})
