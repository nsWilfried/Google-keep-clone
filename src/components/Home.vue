<template>
    <div>
       <div>
        <label for="title">Titre</label>
        <input type="text" v-model="title"  name="name">
       </div>
       <div>
            <label for="title">Contenu</label>
            <input type="text" v-model="message"  name="name">
       </div>
       <div>
        <button v-on:click="addElement()">Ajouter</button>
       </div>

       <div v-for="(item, index) in data" :key="index">
            <span>
                {{item.title}}
            </span>
            <button v-on:click="removeItem()">Supprimer</button>
       </div>
    </div>
</template>
<script>
import {supabase} from "../database/supabase"
export default {
    data() {
        return {
            title: '', 
            message: '',
            data: [], 
            random: []
        }
    }, 
    methods: {
        addElement() {
           this.data.push({
            title: this.title, 
            message: this.message
           }
           )
           this.clearInputs()
        }, 

        clearInputs(){
            this.title ='', 
            this.message =''
        }, 
        removeItem(){
            this.data.splice(this.data.indexOf(this), 1)
        },
    }

    , 
    async created (){
        let { data: tasks, error } =await  supabase.from("tasks").select("*")
        console.log(tasks)
    }



}
</script>
<style lang="">
    
</style>