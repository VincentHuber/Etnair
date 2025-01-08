<script setup>
import "./Ad.less";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  number_of_rooms: {
    type: Number,
    required: true,
  },

  number_of_guests: {
    type: Number,
    required: true,
  },

  pictures: {
    type: Array,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  zipcode: {
    type: Number,
    required: true,
  },
  renter:{
    type:String,
    required:true,
  }
});
</script>

<template>
  <div class="ad">
    <div class="ad__gradient" />
    <CldImage
    class="ad__picture"
    :src="pictures[0]"
    alt="Photos de la propriété"
    height="1000"
    />
    <CldImage
    class="ad__renter"
    :src="renter"
    alt="Photos de la propriété"
    height="50"
    width="50"
    />
    <div class="ad__details">

    <p class="details__price">
      {{ price.toString() }}€<span class="price__night">/nuit</span>
    </p>
    
    <!-- <Nuxtlink class="container__button cta-primary">En savoir plus</Nuxtlink> -->
</div>
    <div class="ad__container">
      <h1 class="container__title">{{ title }}</h1>
      <p class="container__infos">
          {{ size.toString() }}m<sup>2</sup> • {{ number_of_rooms.toString() }} pièces •
          {{ number_of_guests.toString() }} personnes • {{ city }} ({{
              zipcode.toString()
            }})
      </p>
    </div>
  
  </div>
</template>
