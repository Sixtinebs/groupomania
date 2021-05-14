import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import NotFound from '@/views/NotFound.vue';


const routes = [
    {
        name: 'Login',
        path: '/',
        component: Login,
        meta: {
            title: 'Home'
        }
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
        meta: {
            title: 'Signup'
        }
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    document.title = to.meta.title;
})

export default router;