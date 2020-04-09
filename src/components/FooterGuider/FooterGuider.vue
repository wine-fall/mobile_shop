<template>
    <div class="footer_guide border-1px" v-show="$route.meta.showFooter==true"> 
        <!-- 通过路径判断是否添加这个类 -->
        <a href="javascript:;" class="guide_item" :class="{on:'/mysite'===$route.path}" @click="goTo('/mysite')"> 
            <span class="item_icon"> 
                <i class="iconfont icon-waimai-"></i> 
            </span> 
            <span>外卖</span>
            </a> 
            <a href="javascript:;" class="guide_item" :class="{on:$route.path==='/search'}" @click="goTo('/search')"> 
                <span class="item_icon"> 
                    <i class="iconfont icon-sousuo"></i>  
                </span> 
                <span>搜索</span> 
            </a> 
            <a href="javascript:;" class="guide_item" :class="{on:$route.path==='/order'}" @click="goTo('/order')"> 
                <span class="item_icon"> 
                    <i class="iconfont icon-dingdan"></i> 
                </span> 
                <span>订单</span> 
            </a> 
            <a href="javascript:;" class="guide_item" :class="{on:$route.path==='/profile'}" @click="goTo('/profile')"> 
                <span class="item_icon"> 
                    <i class="iconfont icon-user"></i> 
                    </span> 
                    <span>我的</span> 
            </a> 
    </div>
</template>
<script>
export default {
    methods:{
        goTo(path){
            this.$router.replace(path)
        }
    }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
 @import "../../assets/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #0272a7
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>