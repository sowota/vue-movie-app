

<script setup>
import Nav from '../components/Nav.vue';
import { useRoute } from 'vue-router';
import {ref, onMounted, watchEffect} from 'vue'
import axi,{urls, imgUrls, getDetails, getVideo, youtubeUrl, getSimilar} from '../api/index'
import axios from 'axios'
import Movies from '../components/Movies.vue';
import Smilar from '../components/Smilar.vue';
import Footer from '../components/Footer.vue';

const route = useRoute()
console.log(route.params)
const id = route.params.name

const movieDetails = ref(null)
const similarMovies = ref([])
const videoKey = ref(null)
const imgUrl = imgUrls.originalUrl

const fechMovieDetails = watchEffect(()=>{
    const getSingleMovie = async () =>{
        const {data} = await axios.get(getDetails(id))
        movieDetails.value = data
        //console.log(movieDetails)
    }

    const getMV = async () =>{
        const {data} =  await axi.get(getVideo(id))
        videoKey.value = data.results[0].key
        //console.log(videoKey.value)
    }

    getSingleMovie()
    getMV()
})

const fetchSimilar = watchEffect(()=>{
    const getSimiarMovies = async() =>{
        const {data} = await axi.get(getSimilar(id))
        similarMovies.value = data.results
        //console.log(similarMovies.value)
    }

    getSimiarMovies()
})


</script>

<template>
    <Nav/>

    <main>
        <div class="movie__wrap">
            <div class="movie__img">
                <img :src="`${imgUrl}${movieDetails?.backdrop_path}`"/>
            </div>
            <div class="movie__body">
                <div class="movie__left">
                    <h1>{{movieDetails?.original_title}}</h1>
                    <p>Released: {{movieDetails?.release_date}}</p>
                    <div class="movie__rating">
                        <font-awesome-icon icon="star" class="movie__starIcon" />
                        <p>{{movieDetails?.vote_average}}</p>
                    </div>
                    <div  class="movie__genres">
                            <span v-for="genre in movieDetails.genres" :key="genre" class="movie__genre">{{genre?.name}}</span>
                    </div>
                </div>

                <div class="movie__right">
                    <iframe :src="`${youtubeUrl}${videoKey}`" class="movie__video"
                    width="100%"
                    height="100%"></iframe>
                
                    <p class="movie__description">{{movieDetails?.overview}}</p>
                    
                </div>
            </div>
            <div class="movie__similar">
                <Smilar category="similar" :movies="similarMovies"/>
            </div>
        </div>
    </main>
    <Footer/>

  
</template>

<style lang="scss" scoped>
        $primary:#22629a;
        $secondary:#041c2c;
        $accent:#E59D23;
        $whiteish:rgb(221, 220, 220);
        $whiteishHover:rgb(205, 204, 204);


        main{
            margin-top: 40px;
        }
        .movie__body{
            padding: 4vw;
            display:grid;
            gap: 2rem;
            max-width: 1500px;
            margin: 0 auto;
            @media(min-width:768px){
                grid-template-columns: repeat(16, 1fr);
            }
            
        }

        .movie__left{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            @media(min-width:768px){
                grid-column: 1/7;

            }
        }

        .movie__right{
            @media(min-width:768px){
                grid-column: 8/17

            }
        }

        .movie__rating{
            display:flex;
            align-items: center;
            gap: .5rem;
        
        }

        .movie__starIcon{
            color: $accent;
        }

        .movie__genres{
            display:flex;
            gap: .8rem;
            flex-wrap: wrap;
            margin-top: 2.5rem;
        }

        .movie__genre{
            border: 1px solid $whiteish;
            border-radius:30px;
            padding: .3rem .8rem;
        }

       
        .movie__img{
            width: 100vw;
        }

        img{
            width: 100%;
        }

        .movie__left{
            color: $whiteish;
        }

        .movie__right{
            color: $whiteish;
        }

        .movie__video{
            height:300px;
            margin-bottom: 2rem;
           @media(min-width:1200px){
              width: 600px; 
              height: 480px;
           }
        }

        .movie__description{
            font-size: clamp(1rem, 0.9519rem + 0.2404vw, 1.3125rem);
        }

</style>