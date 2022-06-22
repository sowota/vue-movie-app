<template>
   <Nav/>
   <div class="container">
       <h1 class="movie__heading">{{input}}</h1>
       <section class="movie__wrap">
            <div v-for="movie in searchResults" :key="movie" class="movie__body" @click="goToSingle(movie.id)">
                <div class="movie__img">
                    <img :src="`${url}${movie.poster_path}`"
                    loading='lazy'/>
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
       <div class="btns">
           <button v-if="pageNum > 1"  @click="goBack" >Back</button>
           <button @click="fetchMore">Next </button>
       </div>
   </div>
   <Footer/>
</template>

<script setup>
import { watchEffect, ref, watch } from 'vue';
import {useRoute, useRouter} from 'vue-router'
import axios, {handleSearch, imgUrls} from '../api/index'
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()
console.log(router)
const input = route.params.query
console.log(input)
const searchResults = ref([])
const url = imgUrls.originalUrl
const pageNum = ref(1)


watchEffect(async()=>{
  const {data} = await axios.get(handleSearch(input, pageNum.value))
    searchResults.value = data.results.filter(movie => movie.poster_path)
    console.log(searchResults.value)
    
})


const loadMoreMovies = async() =>{
    // console.log('loading')
    // console.log(pageNum.value)
         //console.log(pageNum.value)
        const {data} = await axios.get(handleSearch(input, pageNum.value))
       // console.log(data)
        searchResults.value.push(...data.results)
         //console.log(searchResults.value)
}
const loadLessMovies = async() =>{
    // console.log('loading')
    // console.log(pageNum.value)
         //console.log(pageNum.value)
        const {data} = await axios.get(handleSearch(input, pageNum.value))
       // console.log(data)
        searchResults.value.push(...data.results)
         //console.log(searchResults.value)
}

const fetchMore = () =>{
    pageNum.value += 1
     loadMoreMovies()
     scrollToTop()
}

const goBack = () =>{
    if(pageNum.value === 1) return 
    pageNum.value -= 1
    loadLessMovies()
    scrollToTop()
}

const scrollToTop = () =>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}

// watch(() => pageNum.value, () =>{
//     loadMoreMovies()
// })

// const handleScroll = (e) => {
//     //console.log(e.target.documentElement.scrollHeight)
//     if(window.innerHeight + e.target.documentElement.scrollTop + 10 >= e.target.documentElement.scrollHeight){
//         loadMoreMovies()
//     }

// }

// watchEffect(()=>{
//     if(route.path === `/search/${input}`)
//     window.addEventListener('scroll', handleScroll)
    
// })

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

.btns{
    display:flex;
    margin:0 auto;
    gap:4rem;
    button{
        color: $whiteish;
        font-size:1.2rem;
        border:1px solid $whiteish;
        padding: .7rem 1.8rem;

        &:hover{
            background-color: $whiteishHover;
            color:black;
        }
    }
}

</style>