<template>
    <div class="search">
        <form @submit.prevent="handleSubmit">
            <font-awesome-icon icon="magnifying-glass" class="search__icon" />
            <input
                type="text"
                placeholder="Search by title, people..."
                v-model="input"
            />
        </form>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import axios, {handleSearch} from '../api/index'
import {useRouter} from 'vue-router'

const input = ref('')
const searchResults = ref([])
const router = useRouter()


// watch(input, newValue => {
//     //console.log(newValue)
// } )


const handleSubmit = () =>{

    router.push({
        name:'searchResults',
        params:{
           query:input.value
        }
    })

    input.value = ''

}



</script>

<style lang="scss">
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$whiteish:rgb(221, 220, 220);
$whiteishHover:rgb(205, 204, 204);

input{
    border: none;
    padding: 1rem;
    font-size: clamp(1rem, 0.9808rem + 0.0962vw, 1.125rem);
    background-color:transparent;
    color:white;
    width: 100%;

    &::placeholder{
        color: $whiteish;
    }

    &:focus{
        outline: none;
    }
}

form{
    display:flex;
    align-items: center;
    gap: .7rem;
    justify-content: center;
    background-color: $secondary;
    width:50%;
    border-radius:30px;
    padding: 0 1rem;

}

.search{
    background-color:#041c2cdc ;
    padding: 2rem 0;
    display: flex;
    justify-content: center;

    &__icon{
        color: $whiteishHover;
    }
}

</style>