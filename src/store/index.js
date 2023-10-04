import Vue from "vue";
import Vuex from "vuex";
import LoginUser from "@/store/LoginUser";
import utils from "@/store/utils";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    LoginUser,
    utils
  },
});
