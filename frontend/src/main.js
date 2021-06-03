import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import vuex from 'vuex';
//window.axios = require('axios');


createApp(App).use(router).use(store).use(vuex).use(ElementPlus).mount('#app')
