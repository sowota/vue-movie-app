import axios from "axios"

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
})

//export default axiosConfig

export const imgUrls = {
    originalUrl:'https://image.tmdb.org/t/p/original/',
    w500Url:'https://image.tmdb.org/t/p/w500/'
}



const API_KEY = import.meta.env.VITE_API_KEY


export const urls = {
    getPopular:`movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    getTrending:`trending/movie/day?api_key=${API_KEY}`,
    getLatest:`movie/latest?api_key=${API_KEY}&language=en-US`,
    getUpcoming:`movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    // getSimilarity:`movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`    
}

export const getPopular =(pageNum)=>{
    return `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
}

export const getUpcoming = (pageNum) =>{
    return `movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNum}`
}

export const youtubeUrl = 'https://www.youtube.com/embed/'

export const getVideo = (id) =>{
    return `movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    
}

export const getDetails = (id) =>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    
}

export const getSimilar = (id) =>{
    return `movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
}

export const handleSearch = (input, pageNum) =>{
    return `search/multi?api_key=${API_KEY}&language=en-US&query=${input}&page=${pageNum}&include_adult=false`
}


