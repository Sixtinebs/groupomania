import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';
import vuex from 'vuex';


createApp(App).use(router).use(store).use(vuex).mount('#app')
