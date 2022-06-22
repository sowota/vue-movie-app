

<script setup>
import Movies from './Movies.vue';
import {onMounted, ref} from 'vue'
import axios, {urls, imgUrls} from '../api/index'

const movies = ref([])
const allMovies = ref([])


const fetchMovies = onMounted(()=>{
    const getAllmovies = async () =>{
        const {data} = await axios.get(urls.getPopular)
        movies.value = data.results.slice(0,13)
       // console.log(movies.value)
    }

    getAllmovies()
})

// const getAllMovies = async(category) =>{
//     console.log(category)

//     try{
//         if(category === 'Popular'){
//             const {data} = await axios.get(urls.getPopular)
//             allMovies.value= data.results
//             console.log(allMovies.value)
//         }
//     }catch(err){
//         console.log(err.message)
//     }
// }

</script>

<template>
    <Movies category="Popular" :movies="movies" @getAllMovies="getAllMovies" />
</template>

<style lang="scss">

</style>