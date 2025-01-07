<script setup>
import "../assets/less/pages/index.less";

const {data} = useFetch("/api/ads");

onMounted(() => {
  console.log("data Ads : ", data.value);
});
</script>

<template>
  <div class="content wrapper is-grid">
    <h1> HELLO</h1>
    
    <div v-if="data.allAds">
    <div v-for="(ad, key) in data.allAds" :key="key">

     
      <p>{{ ad.price.toString() }}€ par nuit</p>
      <p>
        {{ ad.size.toString() }}m2 •
        {{ ad.number_of_rooms.toString() }} pièces •
        {{ ad.number_of_guests.toString() }} personnes•
        {{ ad.city}} ({{ad.zipcode.toString()}})
      </p>
      <CldImage
          :src="ad.pictures[0]"
          alt="Photos de la propriété"
    
        />

    </div>
    </div>

    <Nuxtlink class="cta-primary">En savoir plus</Nuxtlink>
  </div>
</template>
