// 包含n个结构请求函数的模块
// 函数的返回值为promise对象

import ajax from "./ajax";

// [1、根据经纬度获取位置详情]
export const reaAddress = (geohash) => ajax(`/position/${geohash}`)

// [2、获取食品分类列表]
export const reaFoodTypes = () => ajax(`/index_category`)

// [3、根据经纬度获取商铺列表]
export const reaShops = (query = { latitude, longitude }) => ajax(`/shops`, query)

// [4、根据经纬度和关键字搜索商铺列表]
export const reaSearchShops = (query = { geohash, keyword }) => ajax(`search_shops`, query)

// [6、用户名密码登陆]
export const reaLogin = (params = { name, pwd, captcha }) => ajax(`/login_pwd`, params, 'POST')

// [7、发送短信验证码]
export const reaSendCode = (phone) => ajax(`/sendcode`, phone)

// [8、手机号验证码登陆]
export const reaLoginSMS = (params = { phone, code }) => ajax(`/login_sms`, params, 'POST')

// [9、根据会话获取用户信息]
export const reaUserInfo = () => ajax(`/userinfo`)

// [10、用户登出]
export const reaLogout = () => ajax(`/logout`)