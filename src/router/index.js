import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import MovieList from '../views/MovieList.vue';
import Movie from '../views/Movie.vue';
import SearchResults from '../views/SearchResults.vue';


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/',
            component:Home
        },
        {
            path:'/movies/:category',
            name:'movieList',
            component:MovieList,
            props:true
        },
        {
            path:'/movie/:name',
            name:'movie',
            component:Movie,
        },
        {
            path:'/search/:query',
            name:'searchResults',
            component:SearchResults,
        }

    ]
})

export default router