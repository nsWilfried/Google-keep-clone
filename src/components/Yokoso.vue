<template>
    <div class="flex w-full h-screen " style="background-color: #1c1c1c;">
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg-white " style="width:300px; height:300px;">

                <div class="flex justify-center items-center">
                    <div>
                        <div>
                            <label for="username">Nom d'utilisateur</label>
                            <input v-model="username" class="form__input border border-1 text-center" type="text"
                                name="username" id="">
                        </div>

                        <div>
                            <label for="email">Email</label>
                            <input v-model="email" class="form__input border border-1 text-center" type="email"
                                name="email" id="">
                        </div>

                        <div>
                            <label for="password">Mot de passe</label>
                            <input v-model="password" class="form__input border border-1 text-center" type="text"
                                name="password" id="">
                        </div>
                        <!-- <button @click="signIn()">Inscrivez  vous</button> -->
                        <button @click="registerUser()" type="submit">Inscrivez vous</button>
                    </div>
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
        async registerUser() {
            // console.log(this.username, this.email, this.password)

            try {
                const { user, error } = await supabase.auth.signUp({
                    email: this.email,
                    password: this.password
                }, {
                    data: {
                        username: this.username
                    }
                }).then(
                    async response => {

                        if (response.error) {
                            this.$swal("Erreur", response.error.message, "error")
                        }

                        if (response.user) {
                            await supabase.from("users").insert(
                                {
                                    username: this.username,
                                    email: this.email
                                }
                            )

                            this.resetForm()
                            this.$swal("Success", "Utilisateur enregistré").then(() => this.$router.push("/connexion"))
                        }

                    }
                )


                // console.log("je suis l'utilisateur fiinal", user)
                // console.log("je suis l'erreur", error)
            }
            catch (e) {

                console.log(e.message)
            }
        }
        ,
        resetForm() {
            this.username = ""
            this.email = ""
            this.password = ''
        },
    },
})
</script>

<style lang="css">
.form__input {
    width: 330px;
    background: #f8f8f8;
    border: 1px solid #f8f8f8;
    padding: 6px;

}
</style>