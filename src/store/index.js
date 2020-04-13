import Vue from 'vue'
import Vuex from 'vuex'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_SHOP_INFO,
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_RATING,
    ADD_FOOD_COUNT,
    MINUS_FOOD_COUNT,
    DELETE_ALL_FOOD,
    SEARCH_SHOP
} from './mutation-types'
import { reqAddress, reqFoodCategorys, reqShops, reqUserInfo, reqLogout, reqShopInfo, reqShopGoods, reqShopRating, reqSearchShops } from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        latitude: 40.10038, // 纬 度
        longitude: 116.36867, // 经 度
        address: {}, // 地 址 信 息 对 象
        categorys: [], // 分 类 数 组
        shops: [], // 商家数组
        userInfo: [],
        shopInfo: {},
        shopGoods: [],
        shopRating: [],
        cartFoods: [],
        searchedShop: [], //搜索后的数组
    },
    mutations: {
        [RECEIVE_ADDRESS](state, { address }) {
            state.address = address
        },
        [RECEIVE_CATEGORYS](state, categorys) {
            state.categorys = categorys
        },
        [RECEIVE_SHOPS](state, shops) {
            state.shops = shops
        },
        [RECEIVE_USER_INFO](state, userInfo) {
            state.userInfo = userInfo
        },
        [RESET_USER_INFO](state) {
            state.userInfo = {}
        },
        [RECEIVE_SHOP_INFO](state, shopInfo) {
            state.shopInfo = shopInfo
        },
        [RECEIVE_SHOP_GOODS](state, shopGoods) {
            state.shopGoods = shopGoods
        },
        [RECEIVE_SHOP_RATING](state, shopRating) {
            state.shopRating = shopRating
        },
        [ADD_FOOD_COUNT](state, food) {
            //新增加的属性要想实现双向绑定必须使用set方法
            if (!food.count) {
                Vue.set(food, 'count', 1)
                state.cartFoods.push(food)
            } else {
                food.count++
            }
        },
        [MINUS_FOOD_COUNT](state, food) {
            if (food.count >= 0) {
                food.count--
                    if (food.count === 0) {
                        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                    }
            }
        },
        [DELETE_ALL_FOOD](state) {
            state.cartFoods.forEach(food => {
                delete food.count
            });
            state.cartFoods = []
        },
        [SEARCH_SHOP](state, searchedShop) {
            state.searchedShop = searchedShop
        }
    },
    actions: {
        async getAddress(context) {
            const geohash = context.state.latitude + ',' + context.state.longitude
            const res = await reqAddress(geohash)
            if (res.code === 0) {
                const address = res.data
                context.commit(RECEIVE_ADDRESS, { address })
            }
        },
        async getCategorys(context) {
            const res = await reqFoodCategorys()
            if (res.code === 0) {
                const categorys = res.data
                context.commit(RECEIVE_CATEGORYS, categorys)
            }
        },
        async getShops(context) {
            const query = {
                latitude: context.state.latitude,
                longitude: context.state.longitude
            }
            const res = await reqShops(query)
            if (res.code === 0) {
                const shops = res.data
                context.commit(RECEIVE_SHOPS, shops)
            }
        },
        recorUser(context, userInfo) {
            context.commit(RECEIVE_USER_INFO, userInfo)
        },
        async getUserInfo(context) {
            const res = await reqUserInfo()
            if (res.code === 0) {
                const userInfo = res.data
                context.commit(RECEIVE_USER_INFO, userInfo)
            }
        },
        async logOut(context) {
            const res = await reqLogout()
            if (res.code === 0) {
                console.log('成功退出');
                context.commit(RESET_USER_INFO)
            }
        },
        async getShopInfo(context) {
            const { data: shopInfo } = await reqShopInfo()
            context.commit(RECEIVE_SHOP_INFO, shopInfo)
        },
        async getShopGoods(context, callback) {
            const res = await reqShopGoods()
            if (res.code === 0) {
                const shopGoods = res.data
                context.commit(RECEIVE_SHOP_GOODS, shopGoods)
                callback && callback() //存在callback时才去调用
            }
        },
        async getShopRating(context, callback) {
            const res = await reqShopRating()
            if (res.code === 0) {
                const shopRating = res.data
                context.commit(RECEIVE_SHOP_RATING, shopRating)
                callback && callback() //存在callback时才去调用
            }
        },
        updateFood(context, { isAdd, food }) {
            if (isAdd) {
                context.commit(ADD_FOOD_COUNT, food)
            } else {
                context.commit(MINUS_FOOD_COUNT, food)
            }
        },
        deleteCart(context) {
            context.commit(DELETE_ALL_FOOD)
        },
        async searchShops(context, keyword) {
            const geohash = context.state.latitude + ',' + context.state.longitude
            const query = {
                geohash: geohash,
                keyword: keyword
            }
            const res = await reqSearchShops(query)
            if (res.code === 0) {
                const searchedShop = res.data
                context.commit(SEARCH_SHOP, searchedShop)
            }
        }
    },
    getters: {
        totalCount(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },
        totalPrice(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
        },
        positiveRating(state) {
            return state.shopRating.reduce((prePos, rating) => prePos + (rating.rateType === 0 ? 1 : 0), 0)
        }
    },
    modules: {}
})