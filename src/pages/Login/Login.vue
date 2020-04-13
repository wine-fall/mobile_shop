<template>
    <div class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">饿了么外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!this.rightPhone" class="get_verification" :class="{on:rightPhone}" @click.prevent="getCode" >
                  {{leftTime>0?`已发送 (${leftTime})s`: '获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册饿了么外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="密码" v-if="showPwd" :class="{on:!showPwd}" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else :class="{on:showPwd}" v-model="pwd">
                  <div class="switch_button off" @click="showPwd=!showPwd" :class="{on:showPwd}">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd? 'abc  ': '...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="captchaCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit" >登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <span href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou"></i>
        </span>
      </div>
      <alertTip :alertText="alertText"  @closeTip="closeTip" v-show="alertVisible"/>
    </div>
</template>
<script>
import alertTip from '../../components/AlertTip/AlertTip'
import { reqLoginPwd, reqSendCode, reqLoginCode } from '../../api/index'
export default {
  data () {
    return {
      loginWay: true, // true是短信登入
      phone: '17801039782', // 手机
      code: '', // 手机验证码
      leftTime: 0,
      showPwd: false, // 密码是否显示
      name: 'abc', // 用户名
      pwd: '123', // 密码
      captcha: '', // 图形验证码
      alertText: '', // 提示文本
      alertVisible: false
    }
  },
  components: {
    alertTip
  },
  computed: {
    rightPhone () {
      const phoneCheck = /^1[3456789]\d{9}$/
      return phoneCheck.test(this.phone)
    }
  },
  methods: {
    async getCode () { // 获取验证码
      if (this.leftTime === 0) {
        this.leftTime = 30
        this.timer = setInterval(() => {
          this.leftTime--
          if (this.leftTime <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)
      }
      const res = await reqSendCode(this.phone)
      console.log(res.code)

      if (res.code === 1) {
        this.showAlert(res.msg)
        this.clearLeftTime()
      }
    },
    clearLeftTime () {
      if (this.leftTime) {
        clearInterval(this.timer)
        this.leftTime = 0
        this.timer = null
      }
    },
    showAlert (alertText) {
      this.alertVisible = true
      this.alertText = alertText
    },
    closeTip () {
      this.alertVisible = false
      this.alertText = ''
    },
    async login () {
      let res
      if (this.loginWay) {
        const paramsCode = {
          phone: this.phone,
          code: this.code
        }
        if (!this.rightPhone) {
          // 手机号错误
          this.showAlert('手机号错误')
          return
        }
        if (!/^\d{6}$/.test(this.code)) {
          // 手机验证码错误
          this.showAlert('手机验证码错误')
          return
        }
        res = await reqLoginCode(paramsCode)
      } else {
        const paramsPwd = {
          name: this.name,
          pwd: this.pwd,
          captcha: this.captcha
        }
        if (!this.name) {
          // 请输入用户名
          this.showAlert('请输入用户名')
        }
        if (!this.pwd) {
          // 请输入密码
          this.showAlert('请输入密码')
        }
        if (!this.captcha) {
          // 请输入图形验证码
          this.showAlert('请输入图形验证码')
        }
        res = await reqLoginPwd(paramsPwd)
      }
      if (res.code === 1) {
        this.showAlert(res.msg)
      } else {
        const userInfo = res.data
        this.$store.dispatch('recorUser', userInfo)
        this.$router.replace('/profile')
      }
      this.clearLeftTime()
    },
    captchaCaptcha (e) { // e的再次运用
      // 这里完成的效果是：用这种方法既可以实现每次点击访问的地址相同，又可以保证src每次点击都会变化。此外，src不存在跨域限制
      e.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #0272a7
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #0272a7
                font-weight 700
                border-bottom 2px solid #0272a7
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #0272a7
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.on
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #0272a7
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #0272a7
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4c98d9
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          touch-action none
          >.iconfont
            font-size 20px
            color #999

</style>
