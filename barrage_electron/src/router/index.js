import VueRouter from 'vue-router'
import Enter from '@/pages/Enter/Enter.vue'
import Main from '@/pages/Main/Main.vue'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/enter'
        },
        {
            name: 'enter',
            path: '/enter',
            component: Enter
        },
        {
            name: 'main',
            path: '/main',
            component: Main,
            
        },
    ],
    // mode:process.env.IS_ELECTRON? 'hash' : 'history',
    // base: process.env.BASE_URL,
    
})


export default router