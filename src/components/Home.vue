<template>
  <div class="w-full h-auto bg-red-300 min-h-screen flex flex-col">
    <!-- github corner -->
    <a href="https://github.com/nsWilfried/" class="github-corner" aria-label="View source on GitHub"><svg width="80"
        height="80" viewBox="0 0 250 250" style="
          fill: #000;
          color: #fff;
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        " aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor" style="transform-origin: 130px 106px" class="octo-arm"></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor" class="octo-body"></path>
      </svg></a>


    <div class="w-ful p-5 bg-green-">
      <div class="w-full flex flex-col justify-center items-center bg-yellow-">
        <div class="w-full flex items-center flex-col h-auto">

          <img src="../assets/google_keep.png" alt="Logo de google keep" style="width: 60px; margin-bottom: 20px;">
          <!-- <button @click="logOut">se déconnecter</button> -->
          <!-- add message and title card-->
          <va-card style="padding: 0.75rem; height: auto; position: relative; margin-bottom: 10px;" class="lg:w-96">
            <div class="row">
              <div class="w-full flex flex-col">
                <!-- add title input  -->
                <div v-if="showTitle">
                  <input class="w-full p-3 font-bold text-lg" v-model="title" outline="false" placeholder="Titre" />
                </div>

                <!-- add message input -->
                <div>
                  <textarea placeholder="Ecrire un message" @focusin="showTitleInput()"
                    class="w-full h-full p-3 font-bold text-lg" style="height: 100px; resize: none" name="task"
                    v-model="message"></textarea>
                </div>
              </div>
            </div>

            <!-- add task button -->
            <div style="position: absolute; top: 90%; left: 0%">
              <va-button size="large" icon="logout" color="#EC7063" text-color="white" class="absolute"
                v-on:click="logOut()" />
            </div>
            <div style="position: absolute; top: 90%; left: 90%">
              <va-button size="large" icon="add" class="absolute" v-on:click="addElement()" />
            </div>
          </va-card>
        </div>

        <div class="w-full mt-4 h-auto flex justify-between gap-2 flex-wrap bg-violet- p-3">
          <div class="" v-for="(item, index) in data" :key="index">
            <!-- <div v-if="user && user.currentSession.user.id == item.user_id">
              <button @click="showUpdateAlert(item)">Modifier</button>
            </div> -->
            <va-card style="gap: 30px">
              <div v-if="item.title == '' && item.task == ''">
                <va-card-title>Empty note</va-card-title>
              </div>

              <div v-else>
                <va-card-title class="w-full flex justify-between">
                  <div class="h-12 w-full bg-green-300 p-1 flex justify-around">
                    <div class="bg-violet-">{{ item.title }}</div>
                    <div @click="showUpdateAlert(item)" class="flex justify-end absolute right-5 "
                      v-if="user && user.currentSession.user.id == item.user_id">
                      <va-icon name="edit_square" size="small" />
                    </div>
                  </div>
                </va-card-title>
                <va-card-content>{{ item.task }}</va-card-content>
              </div>

              <!-- <div>
                {{getUsername(item.user_id)}}
              </div> -->
            </va-card>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>


<style lang="css" >
.random {
  width: 700px;
}

@media only screen and(min-width:600px) {
  .random {
    width: 100px;
  }
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {

  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>


<script>
import { supabase } from "../database/supabase";
export default {
  data() {
    return {
      title: "",
      message: "",
      data: [],
      random: [],
      showTitle: false,
      showCustomContent: false,
      showModal: false,
      user: JSON.parse(localStorage.getItem("supabase.auth.token")),
      username: ""
    };
  },
  methods: {

    // async getUsername(id){
    //   const {data, error} = await supabase.from("users").select("username").eq("id", id)
    //   this.username  = data
    //   console.log("jesuis le nom d'utilisateur")
    //   return this.username; 
    // }, 
    // CRUD operations
    async addElement() {
      const { data, error } = await supabase.from("tasks").insert({
        title: this.title,
        task: this.message,
        user_id: this.user.currentSession.user.id,
      });

      // show error message
      if (error) {
        this.$swal("Erreur", "Erreur lors de la création de la note", "error");
      }

      // show success alert

      this.showSuccessAlert("Note ajouté").then(async () => {
        let { data: tasks, error } = await supabase.from("tasks").select("*");
        this.data = tasks;
      });

      this.clearInputs();
    },

    // reset les inputs
    clearInputs() {
      (this.title = ""), (this.message = "");
    },

    // update element
    async updateItem(id, title, message) {
      const { data, error } = await supabase.from("tasks").update({
        title: title,
        task: message,
      }).match({ id: id });

      if (error) {
        this.$swal(
          "Erreur",
          "Erreur lors de la modification de la note",
          "error"
        );
      }
      this.showSuccessAlert().then(async () => {
        let { data: tasks, error } = await supabase.from("tasks").select("*");
        this.data = tasks;
      });
    },

    // delete element
    async deleteElement(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
      //this.data.splice(this.data.indexOf(this), 1);

      // show error message
      if (error) {
        this.$swal(
          "Erreur",
          "Erreur lors de la suppression de la note",
          "error"
        );
      }

      this.showSuccessAlert("Note supprimé").then(async () => {
        let { data: tasks, error } = await supabase.from("tasks").select("*");
        this.data = tasks;
      });
    },

    // show and cache title input
    showTitleInput() {
      this.showTitle = true;
    },
    cacheTitleInput() {
      this.showTitle = false;
    },

    // show update alert 
    async showUpdateAlert(element) {
      console.log("je suis lelement", element)
      await this.$swal.fire({
        title: "Modifier la note",
        html:
          `<input id="title" value="${element.title}" class="swal2-input">
          <textarea style="resize: none; width:300px; height:100px; padding:5px; " id="task" value="${element.task}" class="swal2-input">${element.task}</textarea>`,
        focusConfirm: false,
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: "Mettre à jour",
        denyButtonText: "Supprimer",
        preConfirm: () => {
          const title = document.getElementById('title').value
          const task = document.getElementById('task').value
          return {
            title, task
          }
        }
      }).then((result) => {
        // console.log("je suis la réponse ", result)
        if (result.isDenied) {
          // console.log("je suis le bouton de confirmation", result.value)
          return this.deleteElement(element.id)
        } else if (result.isConfirmed) {

          // console.log("je suis tout les résulats", result.value)
          return this.updateItem(element.id, result.value.title, result.value.task)

        }

      })
    },

    // Alert methods
    showSuccessAlert(message) {
      return this.$swal("Succès", message, "success");
    },

    // log out
    logOut() {
      const { error } = supabase.auth.signOut().then((response) => {
        if (response.error) {
          return alert(response.error);
        }
        return this.$swal("Succès", "Utilisateur déconnecté").then(() =>
          this.$router.push("/")
        );
      });
    },
  },
  async created() {
    let { data: tasks, error } = await supabase.from("tasks").select("*");
    this.data = tasks;
    // console.log(this.data);
    // this.getUsername(user.)
  },
};
</script>
