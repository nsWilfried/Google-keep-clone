<template>
    <div class="flex w-full h-screen justify-center items-center register" style="background-color: #1c1c1c;">
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg- " style="width:300px; height:auto;">

                <div class="flex flex-col justify-center items-center">
                    <div>
                        <div class="flex flex-col w-full ">
                            <div >
                                <label  for="username" class="  flex justify-center items-center p-3">Nom d'utilisateur</label>
                            </div>

                            <input v-model="username" class="form__input border border-1 text-center" type="text" name="username" />
                        </div>

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

                    <routerLink to="/connexion" class="mt-2">
                        <span class="text-white underline">Se connecter ?</span>
                         </routerLink>
                    <div class="w- bg- flex justify-center items-center p-3 ">
                            <button @click="registerUser()" class="w-32 p-2 submit_button" type="submit">Inscrivez vous</button>

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
    background-color: rgb(38, 48, 60);
    outline: 0px;
    border: 0px;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 500px;
    margin: 0px auto;
    padding: 1rem;
    color: #EC7063;
    font-family: "Fira Code", "Fira Mono", "Roboto Mono", "Lucida Console", Monaco, monospace;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;

}
label{
    color: white;
    font-family: "Fira Code";
    font-size: 1.2em;
    text-transform: capitalize;
}
.submit_button {
    font-family: "Fira Code", "Fira Mono", "Roboto Mono", "Lucida Console", Monaco, monospace;
    text-transform: uppercase;
    width:300px;
    color: white ;
    background-color: #EC7063;
    /* border-radius: 5px; */
    padding: 15px;
    margin-top: 20px;
    font-weight: bold;
}
</style>