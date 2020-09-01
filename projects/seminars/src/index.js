import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'

import './js/common'
import './css/main.css'
import './scss/main.scss'

window.Vue = require('vue')

Vue.component('main-app', require('./components/Main.vue').default);


const app = new Vue({
    store: store,
    el: '#app',
})