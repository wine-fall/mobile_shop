<template>
  <div class="star " :class="'star-'+ size">
        <span class="star-item" v-for="(item,index) in starArray" :key="index" :class="item"></span>
    </div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starArray () {
      const { score } = this
      const arr = []
      const scoreInt = Math.floor(score)
      for (let i = 0; i < scoreInt; i++) {
        arr.push(CLASS_ON)
      }
      if (score * 10 - scoreInt * 10 >= 5) {
        arr.push(CLASS_HALF)
      }
      while (arr.length < 5) {
        arr.push(CLASS_OFF)
      }
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
                        .star
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('./images/stars/star48_on')
                                &.half
                                  bg-image('./images/stars/star48_half')
                                &.off
                                  bg-image('./images/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('./images/stars/star36_on')
                                &.half
                                  bg-image('./images/stars/star36_half')
                                &.off
                                  bg-image('./images/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('./images/stars/star24_on')
                                &.half
                                  bg-image('./images/stars/star24_half')
                                &.off
                                  bg-image('./images/stars/star24_off')

</style>
