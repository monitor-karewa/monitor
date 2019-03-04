import Vue from 'vue';
import App from './App.vue';
import router from './router';

const $ = require('jquery');
window.$ = $;

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});