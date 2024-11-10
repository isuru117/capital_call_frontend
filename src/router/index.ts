import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import InvestorDetails from '@/views/InvestorDetails.vue'
import CapitallCalls from '@/views/CapitallCalls.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/capitalcalls', name: 'CapitalCalls', component: CapitallCalls },
    { path: '/investor/:id', name: 'InvestorDetails', component: InvestorDetails, props: true },
  ],
})

export default router
