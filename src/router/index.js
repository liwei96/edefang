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

  const routes = [
  {
    path: '/',
    redirect:'/index/990'
  },
  {
    path: '/index/:id',
    name: 'Index',
    component: Index
  },
  {
    path: '/introduce/:id',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/dynamic/:id',
    name: 'Dynamic',
    component: Dynamic
  },
  {
    path: '/photo/:id',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/about/:id',
    name: 'About',
    component: About
  },
  {
    path: '/hudeal/:id/:hid',
    name: 'Hudeal',
    component: Hudeal
  },
  {
    path: '/hus/:id',
    name: 'Hus',
    component: Hus
  },
  {
    path: '/comments/:id',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/comment/:id',
    name: 'Comment',
    component: Comment
  },
  {
    path: '/zhou/:id',
    name: 'Zhou',
    component: Zhou
  },
  {
    path: '/image/:id',
    name: 'Image',
    component: Image
  },
  {
    path: '/login/:id',
    name: 'Login',
    component: Login
  },
  {
    path: '/test',
    name: 'test',
    component: Home
  },
  {
    path: '/brand/:id',
    name: 'brand',
    component: Brand
  },
  {
    path: '/deail/:id',
    name: 'deail',
    component: Deail
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
  routes
})

export default router
