import Vue from 'vue'
import VueRouter from 'vue-router'
// 要引用路由组件
import Mysite from '../pages/Mysite/Mysite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/mysite' },
    {
        path: '/mysite',
        component: Mysite,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        meta: {
            showFooter: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/shop',
        component: Shop,
        children: [
            { path: '/shop/info', component: ShopInfo },
            { path: '/shop/goods', component: ShopGoods },
            { path: '/shop/rating', component: ShopRating },
            { path: '', redirect: '/shop/goods' }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router