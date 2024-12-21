<script setup>

const ads = ref(null)
ads.value = getAds()


async function getAds(){
    return await $fetch("/api/ads")
}


console.log('ads : ', ads.value)


</script>

<template>
    <div>
        <h1>HomePage</h1>
    </div>
</template>