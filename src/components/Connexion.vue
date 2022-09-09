<template>
    <div>
        <div>
            <input class="border" v-model="email" type="email" name="email" id="">
        </div>

        <div>
            <input class="border" v-model="password " type="password" name="password">
        </div>

        <button @click="loginUser()">Se connecter</button>
    </div>
</template>
<script>
import {supabase} from "../database/supabase"
export default {
    data() {
        return {
            email: "",
            password: "",
        }
    }, 
    methods: {
        // se connecter
        async loginUser(){
            console.log(this.email, this.password)
            const {user, error} = await supabase.auth.signIn({
                email: this.email, 
                password: this.password
            }).then(response => {
                if(response.error){
                    this.$swal("Erreur", response.error.message, "error")
                }
                if(response.user){
                    this.$swal("Succès", "Utilisateur connecté").then(() => this.$router.push('/home'))
                }
            })
        }
    }
    , 
    mounted(){

        //  récupérer les informations utilisateur
        const supabase = localStorage.getItem("supabase.auth.token")
        if(supabase){
            console.log(JSON.parse(supabase).currentSession.user)

        }
    }
}
</script>
<style lang="scss">
    
</style>