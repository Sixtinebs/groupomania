import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import Profil from '@/views/Profil.vue';
import EditPost from '@/views/EditPost.vue';
import Post from '@/views/Post.vue';


function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    if (localStorage.getItem('user'))
        isAuthenticated = true;
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        next();
    }
    else {
        next('/');
    }
}

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
        afterEnter: guardMyroute,
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
    },
    {
        name: 'Home',
        path: '/home',
        beforeEnter: guardMyroute,
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        name: 'Profil',
        path: '/profil',
        beforeEnter: guardMyroute,
        component: Profil,
        meta: {
            title: 'Mon profil'
        }
    },
    {
        name: 'EditPost',
        path: '/editPost',
        beforeEnter: guardMyroute,
        component: EditPost,
        meta: {
            title: 'Écire un article'
        }
    },
    {
        name: 'Post',
        path: '/post/:id',
        beforeEnter: guardMyroute,
        component: Post,
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