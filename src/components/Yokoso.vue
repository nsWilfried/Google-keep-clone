<template>
    <div class="flex w-full h-screen " style="background-color: #1c1c1c;">
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg-white w-10 " style="width:300px; height:300px;">
            
                <div>
                    <form action="">
                        <div>
                            <label for="username">Nom d'utilisateur</label>
                            <input v-model="username"  class="border border-1 text-center" type="text" name="username" id="">
                        </div>

                        <div>
                            <label for="email">Email</label>
                            <input v-model="email"  class="border border-1 text-center" type="email" name="email" id="">
                        </div>

                         <div>
                            <label for="password">Mot de passe</label>
                            <input v-model="password"  class="border border-1 text-center" type="text" name="password" id="">
                        </div>

                        <button @click="registerUser()" type="submit">Inscrivez vous</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { supabase } from '../database/supabase'

export default ({
    data() {
        return {
            username: "", 
            email: "", 
            password: "",

        }
    }, 

    methods: {
        async registerUser(){
            console.log(this.username, this.email, this.password)

            try{
                const {user, error}= await supabase.auth.signUp({
                    email: this.email,
                    password: this.password
                }, 
                {
                    data: {
                    username: this.username,
                }
                }
                )
            }
            catch(e){
               
               console.log(e)
            }
        }
    },
})
</script>

<style lang="scss">
</style>