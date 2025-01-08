<script setup>
import "../assets/less/pages/index.less";
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";

//Détermine l'index de la slide
const sliderCurrent = ref(0);

//Fonction pour les datas de mon slider
const updateArrow = (s) => {
  sliderCurrent.value = s.track.details.rel;
};

// Déclare la référence du conteneur du slider
const [container] = useKeenSlider({
  loop: true,
  mode: "free-snap",
  slides: {
    perView: 1.5,
    spacing: 35,
    origin: "center",
  },
  detailsChanged: updateArrow,
});
const { data } = useFetch("/api/ads");

onMounted(() => {
  console.log("data Ads : ", data.value);
});
</script>

<template>
  <div class="home">
    <div class="home__infos">
      <p class="infos__price">
        {{ data.allAds[sliderCurrent].price }}€<span>/nuit</span>
      </p>

      <p class="infos__details">
        {{ data.allAds[sliderCurrent].size }} m<sup>2</sup> •
        {{ data.allAds[sliderCurrent].number_of_rooms }} pièces •
        {{ data.allAds[sliderCurrent].number_of_guests }} personnes •
        {{ data.allAds[sliderCurrent].city }} ({{
          data.allAds[sliderCurrent].zipcode
        }})
      </p>
      <NuxtLink class="cta-primary">Découvrir</NuxtLink>
    </div>

    <div v-if="data.allAds" class="home__result">
      <div ref="container" class="keen-slider result__container">
        <NuxtLink
          v-for="(ad, key) in data.allAds"
          :key="key"
          class="keen-slider__slide container__loop"
          :style="{
            opacity: key === sliderCurrent ? 1 : 0.3,
            transition: 'opacity 0.5s ease',
          }"
        >
          <Ad :pictures="ad.pictures" class="loop__ad" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
