<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuider/>
    
  </div>
</template>
<script>
import FooterGuider from './components/FooterGuider/FooterGuider.vue'
export default {
  components:{
    FooterGuider
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    backgroud #f5f5f5
</style>
