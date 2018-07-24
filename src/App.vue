<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tag border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import VHeader from './components/header/header.vue'

  const ERROR_OK= 0

  export default {
    components: {
      VHeader,
    },
    data() {
      return {
        seller:{},
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body
        if(res.errno == ERROR_OK) {
          this.seller = res.data
        }
      })
    },
    methods: {

    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/minxin.styl"
  #app .tag
    display: flex
    width:100%
    height: 40px
    line-height: 40px
    border-1px: (rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      &>a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.router-link-active
          color: orange
</style>
