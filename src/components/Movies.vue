

<script setup>

import {imgUrls} from '../api/index'
import {useRouter, useRoute} from 'vue-router'
import ViewMoreBtn from './ViewMoreBtn.vue';

const router = useRouter()
const route = useRoute()
const url = imgUrls.originalUrl

const props = defineProps({
    movies:{
        type:Array
    },
    category:{
        type:String
    }

})

const getAll = (category) =>{
    //console.log(category)
    //console.log(category)

    router.push({
        name:'movieList',
        params:{
            category:category
        }
    }
    )

    //emits('getAllMovies', category)
}



//const emits = defineEmits(['getAllMovies'])

const getSinglePage = (id) =>{
    router.push({
        name:'movie',
        params:{
            name:id
        }
    })
}

</script>

<template>
    <section class="movie__container" >
        <h1 class="movie__cat">{{category}}</h1>
        <div class="btn__wrapper">
            <ViewMoreBtn :category="category" @getAll="getAll"  />
        </div>
        <div class="movie__wrap" >
            <div 
                v-for="movie in movies" 
                :key="movie" 
                @click="getSinglePage(movie?.id)"
                class="movie__body"
            >
                <div class="movie__img">
                    <img 
                        :src="`${url}${movie?.poster_path}`"
                        loading="lazy"
                    />
                </div>
                <h4 class="movie__title">{{movie?.title}}</h4>
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
  
</template>

<style lang="scss" scoped>
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$whiteish:rgb(221, 220, 220);
$whiteishHover:rgb(205, 204, 204);

.movie__container{
    width: 90vw;
    padding: 10vw 2vw 0 2vw;
    display: grid;
    gap: 3rem;
    margin: 0 auto;
    overflow: hidden;
}

.movie__cat{
    font-size: clamp(1.3125rem, 1.1683rem + 0.7212vw, 2.25rem);
    color:$whiteish;
    text-transform: uppercase;
    letter-spacing:1.3px;
}

.btn__wrapper{
    width: 100%;
    overflow-x: hidden;
    display: flex;
}

.movie__body{
    cursor: pointer;
    &:hover{
        box-shadow: 0px 0px 5px 8px rgba(58, 58, 58, 0.3);
        //transform: scale(1.1);
        transition:all .3s ease-out;
    }

}



.movie__wrap{
    width:100%;
    display: flex;
    gap: 3rem;
    overflow-x: scroll;
    color:rgb(182, 182, 182);
    padding:1rem 0;

    &::-webkit-scrollbar{
        height: .5rem;
        
    }

    &::-webkit-scrollbar-thumb {
        background-color:$primary;
        border-radius: 10px;
    }
  
}



.movie__img{
    width:200px;

    img{
        width:100%;
    }
}

.movie__title{
    padding:.5rem .8rem;

}

.movie__content{
    display:flex;
    justify-content: space-between;
    margin: 1.5rem 0;
    padding:0 .8rem;

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