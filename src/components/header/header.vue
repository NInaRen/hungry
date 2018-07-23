<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64px"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="supports-item">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <div v-show="detailShow" class="detail">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailShow: false
      }
    },
    props: {
      seller: {
        type: Object,
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
    methods: {
      showDetail() {
        this.detailShow = true
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
  .header
    position relative
    overflow hidden
    background-color rgba(7,17,27,0.4)
    color  #fff
    .content-wrapper
      position relative
      padding 24px 12px 18px 14px
      font-size 0
      .avatar
        display inline-block
        &>img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        vertical-align top
        .title
          margin 2px 0 8px 0
          .brand
            vertical-align top
            display inline-block
            width: 30px
            height:18px
            bg-img("./brand")
            background-size :30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .supports
          margin 0
          .icon
            margin 0 4px 0 2px
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size :12px 12px
            background-repeat no-repeat
            &.decrease
              bg-img("./decrease_1")
            &.discount
              bg-img("./discount_1")
            &.guarantee
              bg-img("./guarantee_1")
            &.invoice
              bg-img("./invoice_1")
            &.special
              bg-img("./special_1")
          .supports-item
            font-size 10px
            line-height 12px


      .support-count
        position absolute
        bottom 18px
        right 12px
        padding 0px 8px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        height 24px
        vertical-align top
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          line-height 24px
          margin-left 2px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      background rgba(7,17,27,0.2)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 10px
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-img("./bulletin")
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        margin 0 4px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right: 10px
        top: 8px
    .background
      position absolute
      left: 0
      top: 0px
      width: 100%
      height 100%
      z-index -1
      filter: blur(10px)

    .detail
      position fixed
      z-index 100
      top: 0
      left 0
      width 100%
      height 100%
      overflow: auto
      background rgba(7,17,27,0.8)
</style>
