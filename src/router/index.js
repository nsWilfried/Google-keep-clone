import Home from '../components/Home.vue'
import Yokoso from "../components/Yokoso.vue"
import Connexion from "../components/Connexion.vue"

import { createRouter, createWebHistory } from 'vue-router'

const isUserLogin =  () => {
    const user = localStorage.getItem('supabase.auth.token')
    // console.log("je suis l'utilisateur", user)
            if (user) {
                return {
                    path: "/home"
                }
            }
        }
const routes = [
 
    {
        path: "/", 
        component: Yokoso,
        beforeEnter:[isUserLogin]
    }, 
    {
        path: "/connexion", 
        component: Connexion, 
        beforeEnter:[isUserLogin]

    }, 

    {
        path: "/home", 
        component: Home,
        beforeEnter: () => {
            const user = localStorage.getItem('supabase.auth.token')
            if (!user) {
                return "/connexion"
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router