<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{current: currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'

  const ERROE_OK = 0

  export default {
    components: {
      shopcart
    },
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
      }
    },
    created() {
      this.$http.get("/api/goods").then((res) => {
        res = res.body
        if (res.errno == ERROE_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook")
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.menuScrool = new BScroll(this.$refs.menuWrapper,{click: true})
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {probeType: 3})

        this.foodsScroll.on("scroll", (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook")
        let height = 0
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }

    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"

  .goods
    display flex
    position absolute
    top: 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          margin-right 2px
          display inline-block
          vertical-align top
          width 12px
          height 12px
          background-size :12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img("./decrease_3")
          &.discount
            bg-img("./discount_3")
          &.guarantee
            bg-img("./guarantee_3")
          &.invoice
            bg-img("./invoice_3")
          &.special
            bg-img("./special_3")
        .text
          font-size 12px
          display table-cell
          width 56px
          vertical-align middle
          border-1px rgba(7, 17, 27, 0.1)
          text-align center
    .foods-wrapper
      flex 1
      .title
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background-color #f3f5f7
        padding-left 14px
      .food-item
        margin 18px
        display flex
        padding-bottom 18px
        border-1px rgba(7, 17, 27, 0.1)
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            height 14px
            line-height 14px
            color rgb(7, 17,27)
            margin-top: 2px
          .desc, .extra
            margin-top 8px
            font-size 10px
            line-height 12px
            color rgb(147, 153, 159)
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700px
            line-height 24px
            font-size 0
            .now
              font-size 14px
              color rgb(240,20,20)
              margin-right 8px
            .old
              font-size 10px
              color rgb(147, 153, 159)
              text-decoration line-through
</style>
