import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import cate from './modules/cate'
import recommend from './modules/recommend'
import ad from './modules/ad'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    product,
    cate,recommend,ad
  }
})

export default store