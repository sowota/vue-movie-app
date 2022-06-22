<template>
  <Movies category='upcoming' :movies='movies'/>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios, {urls} from '../api/index'
import Movies from './Movies.vue'

const movies = ref([])

  onMounted(()=>{
    const getAllMovies = async()=>{
        const {data} = await axios.get(urls.getUpcoming)
        movies.value = data?.results
        //console.log(movies.value)
    }

    getAllMovies()
})

</script>

<style>

</style>