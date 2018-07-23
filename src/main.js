import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import VueRouter from 'vue-router'
import goods from 'components/goods/goods.vue';
import seller from 'components/seller/seller.vue';
import ratings from 'components/ratings/ratings.vue';

import './common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false;

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    },
  ]
});


new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<app/>'
})
