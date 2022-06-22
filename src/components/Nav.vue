<template>
    <nav>
        <RouterLink to="/">
            <span class="nav__logo">
                <font-awesome-icon icon="video" />
                <h4>Cinema</h4>
            </span>
        </RouterLink>
    </nav>
  
</template>

<script setup>

</script > 

<style lang="scss" scoped>
$primary:#22629a;
$secondary:#041c2c;
$accent:#E59D23;
$whiteish:rgb(221, 220, 220);
$whiteishHover:rgb(205, 204, 204);
$nav:#02121d;

a{
    color: $whiteish;
}

nav{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    background-color:$nav;
    color: $whiteish;
    padding: 1.5vw 2vw;
}

.nav__logo{
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: clamp(1.125rem, 1.0962rem + 0.1442vw, 1.3125rem);
    
}

</style>