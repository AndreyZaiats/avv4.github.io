import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        message: 'example for vuex'
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getMassage(state) {
            return state.message
        }
    }
})