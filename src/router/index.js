import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import Announcements from "../views/Announcements.vue";
import Reminders from "../views/Reminders.vue";
import FormPage from "../components/FormPage.vue";
import EditFormPage from "../components/EditFormPage.vue";
import MessagePage from "../views/MessagePage.vue";
import MessageChat from "../views/MessageChat.vue";
import ErrorPage from "../views/ErrorPage.vue";

import AdminHomepage from '../views/AdminHomepage.vue'
import AdDashboard from '../views/admin-homepage/AdDashboard.vue'
import UpcomingAssessment from '../views/admin-homepage/UpcomingAssessment.vue'
import ListClient from '../views/admin-homepage/ListClient.vue'
import MasterSchedule from '../views/admin-homepage/MasterSchedule.vue'
import WeeklySchedule from '../views/admin-homepage/WeeklySchedule.vue'
import ListAppointment from '../views/admin-homepage/ListAppointment.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    redirect: "/home",
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/announcements",
    name: "Announcements",
    component: Announcements,
  },
  {
    path: "/reminders",
    name: "Reminders",
    component: Reminders,
  },
  {
    path: "/form/:formtype",
    name: "FormPage",
    component: FormPage,
  },
  {
    path: "/formEdit/:formType/:id",
    name: "EditFormPage",
    component: EditFormPage,
  },
  {
    path: "/messages",
    name: "MessagePage",
    component: MessagePage,
  },
  {
    path: "/chat/:typeUser/:id",
    name: "MessageChat",
    component: MessageChat,
  },
  {
    path: "*",
    name: "ErrorPage",
    component: ErrorPage,
  },
  {
    path: '/adminhomepage',
    name: 'AdminHomepage',
    component: AdminHomepage,
    children: [
      {
        path: '/weekly',
        component: WeeklySchedule
      },
      {
        path: '/appointment',
        name: 'ListAppointment',
        component: ListAppointment
      },
      {
        path: '/master',
        component: MasterSchedule
      },
      {
        path: '/admindashboard',
        name: 'AdminDashboard',
        component: AdDashboard
      },
      {
        path: '/upcoming',
        name: 'UpcomingAssessment',
        component: UpcomingAssessment
      },
      {
        path: '/client',
        name: 'ListClient',
        component: ListClient
      },
    ]
  },
  
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
