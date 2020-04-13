<template>
    <div class="search">
        <HeaderTop tittle="搜索"></HeaderTop>
        <form class="search_form" action="#" @submit.prevent="searchShop">
          <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="keyword">
          <input type="submit" name="submit" class="search_submit">
        </form>
        <section class="list" v-if="!showWarning">
          <ul class="list_container">
            <router-link :to="{path:'/shop', query:{id:shop.id}}" tag="li" v-for="shop in searchedShop" :key="shop.id" class="list_li">
              <section class="item_left">
                <img :src="BASE_URL+shop.image_path" class="restaurant_img">
              </section>
              <section class="item_right">
                <div class="item_right_text">
                  <p> <span>{{shop.name}}</span> </p>
                  <p>月售 {{shop.recent_order_num}} 单</p>
                  <p>{{shop.float_minimum_order_amount}} 元起送 / 距离 {{shop.distance}}</p>
                </div>
              </section>
            </router-link>
          </ul>
        </section>
        <div class="warning" v-else>
          <div class="warning-text">
          搜索内容不存在
          </div>
        </div>
    </div>
</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      keyword:'',
      BASE_URL:'http://cangdu.org:8001/img/',
      showWarning:false
    }
  },
  computed:{
    ...mapState(['searchedShop'])
  },
  methods:{
    searchShop(){
      this.showWarning=false
      const keyword=this.keyword.trim()
      if(keyword){
      this.$store.dispatch('searchShops',keyword)
      }
    }
  },
  watch:{
    searchedShop(value){
      if(!value.length>0){
        this.showWarning=true
      }
    }
  },
  components: { HeaderTop }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .warning
      display flex
      height 100px
      align-items center
      .warning-text
        margin 0 auto
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      margin-bottom 50px
      .list_container
        background-color #fff
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
