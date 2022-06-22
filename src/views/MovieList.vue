<template>
    <Nav/>
   <div class="container">
       <h1 class="movie__heading">{{params}}</h1>
       <section class="movie__wrap">
            <div v-for="movie in allMovies" :key="movie" class="movie__body" @click="goToSingle(movie.id)">
                <div class="movie__img">
                    <img :src="`${url}${movie?.poster_path}`"/>
                </div>
                <div class="movie__details">
                    <h4>{{movie?.original_title || movie?.original_name}}</h4>
                    <div class="movie__content">
                        <p>{{movie?.release_date}}</p>
                        <p class="movie__rating">
                            <font-awesome-icon icon="star" class="movie__startIcon" />
                            {{movie?.vote_average}}
                        </p>
                    </div>
                </div>
            </div>
       </section>
   </div>
   <!-- <Footer/> -->
</template>

<script setup>

import {useRoute, useRouter} from 'vue-router'
import {watch, ref, onMounted, watchEffect, onUnmounted} from 'vue'
import axios, {urls, getPopular, getUpcoming} from '../api/index'
import {imgUrls} from '../api/index'
import Nav from '../components/Nav.vue';

const url = imgUrls.originalUrl

const route = useRoute()
const router = useRouter()
const allMovies = ref([])
console.log(route.path)

const pageNum = ref(2)
const pageNum2 = ref(2)

const params = route.params.category

watchEffect(async ()=>{
    console.log('watching...')
    if(params === 'Popular'){
        const {data} = await axios.get(urls.getPopular)
        allMovies.value = data.results
        //console.log(allMovies.value)
    }else if(params === 'trending'){
        const {data} = await axios.get(urls.getTrending)
        allMovies.value = data.results
    }else{
        const {data} = await axios.get(urls.getUpcoming)
        allMovies.value = data.results
    }
} )

const goToSingle =(id) =>{
    router.push({
        name:'movie',
        params:{
            name:id
        }
    })
}

const loadMoreMovies =async() =>{
    // console.log('loading')
    // console.log(pageNum.value)
    if(params === 'Popular'){
        const {data} = await axios.get(getPopular(pageNum.value))
        console.log(data)
         allMovies.value.push(...data.results)
         pageNum.value += 1
         //console.log(allMovies.value)
    }

    if(params === 'upcoming'){
        const {data} = await axios.get(getPopular(pageNum2.value))
        allMovies.value.push(...data.results)
        pageNum2.value += 1
    }
}

const handleScroll = (e) => {
    //console.log(e.target.documentElement.scrollHeight)
    if( window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
        console.log('reached')
        loadMoreMovies()
    }

}

watchEffect(()=>{
    if(route.path === '/movies/upcoming' || '/movies/Popular'){
        window.addEventListener('scroll', handleScroll)
        // window.removeEventListener('scroll', handleScroll)
    }
})

onUnmounted(() =>{
    window.removeEventListener('scroll', handleScroll)
})

</script>

<style lang="scss" scoped>
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$whiteish:rgb(221, 220, 220);
$whiteishHover:rgb(205, 204, 204);

.container{
    background-color:$secondary;
    padding:20vw 10vw;
    display: grid;
    gap: 4rem;

    @media(min-width:1068px){
        padding: 4vw 6vw;
        margin-top:60px ;
    }  
}

.movie__heading{
    //padding-left: 2vw;
    color:$whiteish;
    font-size: clamp(1.25rem, 1.0962rem + 0.7692vw, 2.25rem);
    text-transform: capitalize;

}

.movie__wrap{
    //padding: 0 2vw;
    margin: 0 auto;
    width: 85vw;
    display: grid;
    gap:1.5rem;
    color:rgb(211, 211, 211);

    @media(min-width: 768px){
        grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    }
    /* @media(min-width: 1024px){
        grid-template-columns: repeat(4, 1fr);
        gap:1.5rem;
        //padding:0 6vw;
    }
    @media(min-width: 1280px){
        grid-template-columns: repeat(5, 1fr);
    }
    @media(min-width: 1400px){
        grid-template-columns: repeat(6, 1fr);
    } */
}

.movie__body{
    width: 200px;
    cursor: pointer;
}

.movie__details{
    width: 200px;
}

.movie__img{
    width: auto;

    img{
        width: 100%;
    }
}

.movie__content{
    display:flex;
    justify-content: space-between;
    margin: 1.5rem 0;

}

.movie__rating{
    display:flex;
    align-items:center;
    gap: .6rem;
    font-size: clamp(.9rem, 1vw,1.1rem);

}

.movie__startIcon{
    color:$accent;
}

</style>