<script setup>
import 'vue3-carousel/dist/carousel.css';
import {ref, watchEffect, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import axios, {urls, imgUrls} from '../api/index'
//import axios from 'axios'

const trendMovies = ref([])
//console.log(urls.getTrending)
const router = useRouter()

const url = imgUrls.originalUrl

onMounted(()=>{
  const getTrendMovies = async ()=>{
    const response = await axios.get(urls.getTrending)
    trendMovies.value = response.data.results.slice(0,5)
    //console.log(trendMovies.value)

  }

   getTrendMovies()

  // const getMovies = async()=>{
  //   const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=5418be99535cb60147974e8133a5a985`)
    
  //   trendMovies.value = data
  //    console.log(trendMovies.value)

  // }

  // getMovies()
})

const goToDetails = (id) =>{
    router.push({
      name:'movie',
      params:{
        name:id
      }
    })
}


// const createUrl = watch(trendMovies, newValue =>{
//   newValue.map(movie =>{
//       return imgUrls.originalUrl + movie?.poster_path
//     }) 
// })

// const imgUrl = () =>{
//   if(trendMovies.value){
//     trendMovies.value.map(movie =>{
//       return imgUrls.originalUrl + movie?.poster_path
//     }) 

//   }
// }

</script>

<template>
  <Carousel :items-to-show="1" autoplay="8000" transition="1000">
      <Slide v-for="movie in trendMovies" :key="movie">
        <div class="imgContainer">
          <img 
          :src="`${url}${movie.backdrop_path}`" 
          alt='movie poster'
          loading="lazy"
          />
        </div>
        <div class="slider__content">
          <h1 class="slider__title">{{movie.original_title}}</h1>
          <p class="slider__overview">{{movie.overview}}</p>
          <button class="action" @click="goToDetails(movie.id)">View More</button>
        </div>
      </Slide>
  </Carousel>
  
</template>



<style lang="scss">

$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$accentHover:#b37b1c;
$whiteish:rgb(221, 220, 220);

.imgContainer {
  width: 100vw;
  height: 60vh;
  position: relative;

  @media(min-width:1024px){
    height: 100vh;
  }

  &::after{
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5); 

    }
  

  img{
    width: 100%;
    height: 100%;
    position: relative;
  }

}

.slider__content{
  position: absolute;
  top: 50%;
  left:10%;
  transform:translate(0,-50%);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  h1{
    color:white;
    font-size:clamp(2rem, 1.636rem + 1.82vw, 3rem);
    letter-spacing: 1px;
    text-align: left;
    max-width: 500px;
  }

  .action{
    background-color:$accent;
    padding:1rem 1.5rem;
    color:white;
    text-transform: uppercase;
    letter-spacing:2px;
    align-self: start;
    font-size: clamp(0.875rem, 0.8173rem + 0.2885vw, 1.25rem);

    &:hover{
      background-color:$accentHover;
    }
  }
}

.slider__overview{
  color:$whiteish;
  text-align:left;
  max-width: 400px;
  max-height: 170px;
  overflow:hidden;
  text-overflow: ellipsis;
}


</style>