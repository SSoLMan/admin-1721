import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import cate from './modules/cate'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    product,
    cate
  }
})

export default store