<script setup>
import "../assets/less/pages/index.less";
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";

// Déclare la référence du conteneur du slider
const [container] = useKeenSlider({
  loop: true,
  mode: "free-snap",
  slides: {
    perView: 1.5,
    spacing: 35,
    origin: "center",
  },
});
const { data } = useFetch("/api/ads");

onMounted(() => {
  console.log("data Ads : ", data.value);
});
</script>

<template>
  <div class="home">
    <div v-if="data.allAds" class="home__result">
      <div ref="container" class="keen-slider result__container ">
        <div
          v-for="(ad, key) in data.allAds"
          :key="key"
          class="keen-slider__slide container__loop "
        >
          <Ad
            :renter="ad.renter.picture"
            :title="ad.title"
            :price="ad.price"
            :size="ad.size"
            :number_of_guests="ad.number_of_guests"
            :number_of_rooms="ad.number_of_rooms"
            :city="ad.city"
            :zipcode="ad.zipcode"
            :pictures="ad.pictures"
            class="loop__ad"
          />
        </div>
      </div>
    </div>
  </div>
</template>
