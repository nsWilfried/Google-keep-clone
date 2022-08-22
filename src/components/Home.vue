<template>
    <div class="w-full h-screen flex flex-col  bg-green-">
        <div class="w-full h-96 bg-red-300 flex items-center justify-center">
            <div  class=" w-full flex justify-center items-center  bg-yellow-">
                <div class=" w-full  flex items-center flex-col h-auto" >
                    <!-- add message and title card-->
                    <va-card   style="padding: 0.75rem; height: 200px;position: relative; width:700px ; ">
                        <div class="row">
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
                                    <textarea placeholder="Ecrire un message" @focus="showTitleInput()" @blur="cacheTitleInput()" class="w-full h-full  p-3  font-bold text-lg" style="height:100px;resize: none;" name="task" v-model="message" ></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- add task button -->
                         <div style="position: absolute; top:90%; left: 90%;">
                             <va-button size="large" icon="add"  class="absolute " v-on:click="addElement()"/>
                    
                         </div>
                    </va-card>

               
                </div>

            </div>
            
                
        </div>
         <!-- <div v-for="(item, index) in data" :key="index">
                    <span>
                        {{item.title}}
                    </span>
                </div> -->
     
    </div>
</template>
<script>
import {supabase} from "../database/supabase"

export default {
    name: "Home", 
    data() {
        return {
            title: '', 
            message: '',
            data: [], 
            random: [], 
            showTitle:false
        }
    }, 
    methods: {
       async addElement() {
            const {data, error} = await supabase.from('tasks').insert({
                title: this.title,
                task: this.message,
            })
           this.clearInputs()
        }, 

        clearInputs(){
            this.title ='', 
            this.message =''
        }, 
        async removeItem(){
            const {data , error} = await supabase.from('tasks').delete()
            this.data.splice(this.data.indexOf(this), 1)
        },
        showTitleInput(){
            this.showTitle = true
        }, 

        cacheTitleInput(){
            this.showTitle = false
        }

        
    }

    , 
    async created (){
        let { data: tasks, error } =await  supabase.from("tasks").select("*")
        this.data = tasks

        console.log(this.data)
    }



}
</script>
<style lang="">
    
</style>