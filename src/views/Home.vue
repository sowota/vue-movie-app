<script setup>
import Hero from '../components/Hero.vue'
import PopularMovies from '../components/PopularMovies.vue';
import TrendingMovies from '../components/TrendingMovies.vue';
import UpcomingMovies from '../components/UpcomingMovies.vue'
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import SearchBar from '../components/SearchBar.vue';

</script>

<template>
    <Nav/>
    <Hero />
    <SearchBar/>
    <main>
        <PopularMovies/>
        <TrendingMovies/>
        <UpcomingMovies/>
    </main>
    <Footer/>
  
</template>

<style lang="scss">
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;

main{
    background-color:$secondary;
}


</style>