<template>
     <div class="flex w-full h-screen justify-center items-center register" style="background-color: #1c1c1c;">
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg- " style="width:300px; height:auto;">

                <div class="flex flex-col justify-center items-center">
                    <div>

                        <div class="flex flex-col w-full ">
                            <div >
                                <label for="email" class="  flex justify-center items-center p-3">Email</label>
                            </div>
                            <input v-model="email" class="form__input border border-1 text-center" type="email" name="email"/>
                        </div>

                        <div class="flex flex-col w-full ">
                            <div >
                                <label for="password" class="  flex justify-center items-center p-3">Mot de passe</label>
                            </div>
                            <input v-model="password" class="form__input border border-1 text-center" type="password" name="password"/>
                        </div>

                        
                    </div>

                    <routerLink to="/" class="mt-2">
                        <span class="text-white underline">Inscription?</span>
                         </routerLink>
                    <div class="w- bg- flex justify-center items-center p-3 ">
                            <button @click="loginUser()" class="w-32 p-2 submit_button" type="submit">Se connecter</button>

                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { supabase } from "../database/supabase"
export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    // se connecter
    async loginUser() {
      console.log(this.email, this.password)
      const { user, error } = await supabase.auth.signIn({
        email: this.email,
        password: this.password
      })
      if (user) {
        this.$swal("Succès", "Utilisateur connecté").then(() => this.$router.push('/home'))

      }
      if (error) {
        this.$swal("Erreur", error.message, "error")
      }

    }

  }
  ,
  mounted() {

    //  récupérer les informations utilisateur
    const supabase = localStorage.getItem("supabase.auth.token")
    // if (supabase) {
    //   console.log(JSON.parse(supabase).currentSession.user)

    // }
  }
}
</script>
<style lang="scss">

</style>