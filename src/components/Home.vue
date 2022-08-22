<template>
    <div class="w-full h-auto min-h-screen  bg-red-300  flex flex-col ">
        <div class="w-ful p-5 bg-green- ">
            <div  class=" w-full flex flex-col  justify-center items-center  bg-yellow-">
                <div class=" w-full  flex items-center flex-col h-auto" >
                    <!-- add message and title card-->
                    <va-card   style="padding: 0.75rem; height: auto;position: relative;" class="lg:w-96">
                        <div  class="row">
                            <div class="w-full flex flex-col  "  >

                                <!-- add title input  -->
                                <div v-if="showTitle" >
                                    <input
                                    class="w-full p-3  font-bold text-lg"
                                    v-model="title"
                                    outline="false"
                                    placeholder="Titre"
                                    />
                                </div>

                                <!-- add message input -->
                                <div>
                                    <textarea placeholder="Ecrire un message" @focusin="showTitleInput()"   class="w-full h-full  p-3  font-bold text-lg" style="height:100px;resize: none;" name="task" v-model="message" ></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- add task button -->
                         <div style="position: absolute; top:90%; left: 90%;">
                             <va-button size="large" icon="add"  class="absolute " v-on:click="addElement()" />
                    
                         </div>
                    </va-card>

               
                </div>

            <div class="w-full mt-4 h-auto flex justify-between gap-2 flex-wrap bg-violet- p-3" >
                  <div class="" v-for="(item, index) in data" :key="index">
                    <va-card style=" gap:30px;">
                        <div v-if="item.title == '' && item.task == ''">
                            <va-card-title>Empty note</va-card-title>
                        </div>

                        <div v-else>
                            <va-card-title class="w-full flex justify-between ">
                                <div class="h-12 w-full bg-green-300 p-1 flex  justify-around ">
                                    <div class="bg-violet-">{{item.title}}</div>
                                    <div class="flex justify-end">
                                        
                                    </div>
                                </div>
                            </va-card-title>
                            <va-card-content>{{item.task}}</va-card-content>
                        </div>
                    </va-card>
                         

                  </div>

            </div>
            </div>


                
        </div>
    </div>
</template>
<script>
import {supabase} from "../database/supabase"

export default {
    name: "Home",
   
    data() {
        return {
            title: "",
            message: "",
            data: [],
            random: [],
            showTitle: false,
            showCustomContent: false, 
            showModal: false
        };
    },
    methods: {
        // CRUD operations
        async addElement() {
            const { data, error } = await supabase.from("tasks").insert({
                title: this.title,
                task: this.message,
            });
            if (error) {
                console.log("Il y'a une erreur");
            }
            this.showSuccessAlert().then(async () => {
                let { data: tasks, error } = await supabase.from("tasks").select("*");
                this.data = tasks;
            });
            this.clearInputs();
        },
        clearInputs() {
            this.title = "",
                this.message = "";
        },
        async removeItem() {
            const { data, error } = await supabase.from("tasks").delete();
            this.data.splice(this.data.indexOf(this), 1);
        },
        showTitleInput() {
            this.showTitle = true;
        },
        cacheTitleInput() {
            this.showTitle = false;
        },
        // Alert methods
        showSuccessAlert() {
            return this.$swal("Succès", "Message ajouté", "success");
        }, 
    },
    async created() {
        let { data: tasks, error } = await supabase.from("tasks").select("*");
        this.data = tasks;
        console.log(this.data);
    },
}
</script>
<style lang="css">
    .random {
        width: 700px;
    }
    @media only screen and(min-width:600px ){
        .random {
            width:100px; 
        }
    }
</style>