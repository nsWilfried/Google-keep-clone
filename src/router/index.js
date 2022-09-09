import Home from '../components/Home.vue'
import Yokoso from "../components/Yokoso.vue"
import Connexion from "../components/Connexion.vue"

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
 
    {
        path: "/", 
        component: Yokoso ,
    }, 
    {
        path: "/connexion", 
        component: Connexion
    }, 

    {
        path: "/home", 
        component: Home ,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router