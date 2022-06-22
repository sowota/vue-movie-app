

<script setup>
import axios, {urls} from '../api/index'
import {ref, onMounted} from 'vue'
import Movies from './Movies.vue'

const movies = ref([])

const fetchMovies = onMounted(()=>{
    const getAllMovies = async() => {
        
            const {data} = await axios.get(urls.getTrending)
            movies.value = data.results.slice(0,13)
            //console.log(movies.value)
    }

    getAllMovies()
})

</script>

<template>
    <Movies category='trending' :movies='movies'/>
</template>

<style lang="scss">

</style>