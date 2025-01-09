<script setup>
import "../assets/less/pages/index.less";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";

//Variable pour le slider
const sliderKeen = ref(null);
const container = ref(null);

//Import des icons
import ArrowLeft from "../assets/icons/arrowLeft.svg";
import ArrowRight from "../assets/icons/arrowRight.svg";

//Récupère toute les annonces
const { data } = useFetch("/api/ads");

//Vérifie si on est en mobile
const isMobile = ref(null);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 1135;
};

//Détermine l'index de la slide
const sliderCurrent = ref(0);

//Initialise le slide
const initSlider = () => {
  sliderKeen.value = new KeenSlider(container.value, {
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1.5,
      spacing: 25,
      origin: "center",
    },
    detailsChanged: (s) => {
      sliderCurrent.value = s.track.details.rel;
    },
  });
};

// Va à là slide précédente
const handlePrev = () => {
  if (sliderKeen.value) {
    sliderKeen.value.prev();
  }
};

// Va à la prochaine slide
const handleNext = () => {
  if (sliderKeen.value) {
    sliderKeen.value.next();
  }
};

onMounted(() => {
  if (container.value) {
    initSlider();
  }
  window.addEventListener("resize", updateIsMobile);
});


onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<template>
  <div class="home">
    <div v-if="data && data.allAds" class="home__infos">
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
      <div>
        <NuxtLink
          class="cta-primary infos__buttonLeft "
          :to="`/details/${data.allAds[sliderCurrent].id}`"
          >En savoir plus</NuxtLink
        >
        <NuxtLink
          class=" cta-primary-outline infos__buttonRight"
          :to="`mailto:${data.allAds[sliderCurrent].renter.email}`"
          >Contacter l'hôte</NuxtLink
        >
      </div>
    </div>

    <div v-if="!isMobile" class="home__arrows">
      <button class="arrows__left" @click="handlePrev">
        <ArrowLeft class="icon-arrow-left" />
      </button>
      <button class="arrows__right" @click="handleNext">
        <ArrowRight class="icon-arrow-right" />
      </button>
    </div>

    <div v-if="data.allAds" class="home__result">
      <div ref="container" class="keen-slider result__container">
        <NuxtLink
          v-for="(ad, key) in data.allAds"
          :key="key"
          class="keen-slider__slide container__loop"
          :to="`/details/${ad.id}`"
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
