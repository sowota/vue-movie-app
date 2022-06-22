

<script setup>


const props = defineProps({
    movies:{
        type:Array
    },
    category:{
        type:String
    }

})

//console.log(props.category)

const fetchAll = (category) =>{
    emits('getAll', category)
}

const emits = defineEmits(['getAll'])



</script>

<template>
  <button class="movie__btn" @click="fetchAll(props.category)"> View More</button>
</template>

<style lang="scss" scoped>
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$whiteish:rgb(221, 220, 220);
$whiteishHover:rgb(205, 204, 204);

.movie__btn{
    background-color: $whiteish;
    justify-self: flex-end;
    padding: .7rem 1.8rem;
    border-radius: 30px;
    margin-left: auto;
    text-transform: uppercase;
    &:hover{
        background-color: $whiteishHover;
    }

}

</style>