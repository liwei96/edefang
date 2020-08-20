import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Introduce from '../views/Introduce'
import Dynamic from '../views/Dynamic'
import Photo from '../views/Photo'
import About from '../views/About'
import Hudeal from '../views/Hudeal'
import Hus from '../views/Hus'
import Comments from '../views/Comments'
import Comment from '../views/Comment'
import Zhou from '../views/Zhou'
import Image from '../views/Image'
import Login from '../views/Login'
import Home from '../views/Home'
import Brand from '../views/Brand'
import Deail from '../views/Deail'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index/990'
  },
  {
    path: '/index/:id',
    name: 'Index',
    // component: Index
    component: () => import('../views/Index.vue')
  },
  {
    path: '/intro/:id',
    name: 'Introduce',
    // component: Introduce
    component: () => import('../views/Introduce.vue')
  },
  {
    path: '/dynamic/:id',
    name: 'Dynamic',
    component: () => import('../views/Dynamic.vue')
    // component: Dynamic
  },
  {
    path: '/photo/:id',
    name: 'Photo',
    // component: Photo
    component: () => import('../views/Photo.vue')
  },
  {
    path: '/about/:id',
    name: 'About',
    // component: About
    component: () => import('../views/About.vue')
  },
  {
    path: '/hudeal/:id/:hid',
    name: 'Hudeal',
    // component: Hudeal
    component: () => import('../views/Hudeal.vue')
  },
  {
    path: '/hus/:id',
    name: 'Hus',
    // component: Hus
    component: () => import('../views/Hus.vue')
  },
  {
    path: '/discusss/:id',
    name: 'Comments',
    // component: Comments
    component: () => import('../views/Comments.vue')
  },
  {
    path: '/discuss/:id',
    name: 'Comment',
    // component: Comment
    component: () => import('../views/Comment.vue')
  },
  {
    path: '/zhou/:id',
    name: 'Zhou',
    // component: Zhou
    component: () => import('../views/Zhou.vue')
  },
  {
    path: '/image/:id',
    name: 'Image',
    // component: Image
    component: () => import('../views/Image.vue')
  },
  {
    path: '/login/:id',
    name: 'Login',
    // component: Login
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    // component: Home
    component: () => import('../views/Home.vue')
  },
  {
    path: '/brand/:id',
    name: 'brand',
    // component: Brand
    component: () => import('../views/Brand.vue')
  },
  {
    path: '/deail/:id',
    name: 'deail',
    // component: Deail
    component: () => import('../views/Deail.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
  
})

export default router