import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/information',
    name: 'information',
    redirect: '/information/contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/Information.vue'),
    children: [{
      path: 'contact',
      name: 'contact',
      component: () => import('./views/ContactView.vue')
    },
    {
      path: 'timetable',
      name: 'timetable',
      component: () => import('./views/TimetableView.vue')
    },
    {
      path: 'ratings',
      name: 'ratings',
      component: () => import('./views/RatingsView.vue')
    }
    ]
  },
  {
    path: '/education',
    name: 'education',
    redirect: '/education/catalogue',
    component: () => import('./views/Education.vue'),
    children: [{
      path: 'catalogue',
      name: 'catalogue',
      component: () => import('./views/CatalogueView.vue')
    },
    {
      path: 'courses',
      name: 'courses',
      component: () => import('./views/CoursesView.vue')
    }
    ]
  }
  ]
})
