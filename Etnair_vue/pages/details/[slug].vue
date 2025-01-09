<script setup>
import "../assets/less/pages/details.less";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

//Variable pour les dates
import { format } from "date-fns";
import { fr } from "date-fns/locale";
const formattedDates = ref([]);

//Variables pour récupérer l'annonce
const data = ref(null);
const route = useRoute();

//Inputs
const travelDays = ref(null);
const hosts = ref(null);

//Variable pour le slider
const sliderKeen = ref(null);
const container = ref(null);

// Initialisation du slider après le chargement des données
// const initSlider = () => {
//   if (container.value && data.value?.ad?.pictures) {
//     sliderKeen.value = new KeenSlider(container.value, {
//       loop: true,
//       mode: "free-snap",
//       slides: {
//         perView: 4,
//         spacing: 25,
//         origin: "center",
//       },
//     });
//   }
// };

// Récupère l'annonce
const fetchData = async () => {
  try {
    data.value = await $fetch(`/api/ad/${route.params.slug}`, {
      method: "get",
    });

    // Formater les dates
    if (data.value?.ad?.bookable_dates) {
      formattedDates.value = data.value.ad.bookable_dates.map((date) =>
        format(new Date(date), "d MMMM yyyy", { locale: fr })
      );
    }
  } catch (err) {
    console.error(err);
  }
};

// Le slug est accessible uniquement quand le DOM est monté
onMounted(() => {
  fetchData();

  if (container.value) {
    initSlider();
  }
});
</script>

<template>
  <div v-if="data && data.ad" class="ad wrapper is-grid">
    <!-- Infos propriétaire -->
    <div class="ad__adRenter">
      <CldImage
        class="adRenter__picture"
        :src="data?.ad?.renter.picture"
        alt="Photos du propriétaire"
        height="100"
        width="100"
      />
      <NuxtLink class="cta-secondary adRenter__nickname">
        {{ data.ad.renter.nickname }}
      </NuxtLink>
    </div>

    <!-- Infos propriété -->
    <h1 class="ad__adTitle">{{ data.ad.title }}</h1>
    <h3 class="ad__adInfos">
      {{ data.ad.size }} m<sup>2</sup> • {{ data.ad.number_of_rooms }} pièces •
      {{ data.ad.number_of_guests }} personnes • {{ data.ad.city }} ({{
        data.ad.zipcode
      }})
    </h3>

    <CldImage
      class="ad__adPicture"
      :src="data?.ad?.pictures[0]"
      alt="Photos de couverture du bien"
      height="1000"
      width="2000"
    />
    <p>{{ data.ad.description }}</p>

    <div class="ad__adFeatures">
      <div v-for="(feature, key) in data.ad.features" :key="key">
        <Features :text="feature" />
      </div>
    </div>

    <!-- Keen Slider -->
    <!-- <div ref="container" class="keen-slider ad__adContainer">
      <CldImage
        v-for="(ad, key) in data.ad.pictures.slice(1)"
        :key="key"
        class="keen-slider__slide adContainer__loop"
        :src="ad"
        alt="Photos de la propriété"
        height="400"
        width="800"
      />
    </div> -->

    <!-- Disponiblité -->
    <div class="ad__bookablesDates" v-if="formattedDates.length === 2">
      <p class="bookablesDates__dates">
        Disponible du {{ formattedDates[0] }} au {{ formattedDates[1] }}
      </p>
      <p class="bookablesDates__price">
        {{ data.ad.price }}€<span class="price__night">/nuit</span>
      </p>
    </div>

    <!-- Inputs -->
    <div class="ad__adInputs">
      <Datepicker
        class="adInputs__travelDays"
        v-model="travelDays"
        :enable-time-picker="false"
        :format="formatTravelDays"
        :format-locale="fr"
        placeholder="Arrivée et départ"
        select-text="Sélectionner"
        cancel-text="Fermer"
        range
      />
      <input
        class="adInputs__hosts"
        v-model="hosts"
        placeHolder="Nombre de voyageurs"
      />
    </div>

    <!-- Prix nuité -->
    <div class="ad__nightCalculation">
      <p class="nightCalculation__perNight">
        {{ data.ad.price }} x {{ hosts || 4 }} nuits
      </p>
      <p class="nightCalculation__totalPerNight">
        {{ data.ad.price * (hosts || 4) }}€
      </p>
    </div>

    <!-- Prix service -->
    <div class="ad__feeCalculation">
      <p class="ad__feeText">Frais de service Etnair</p>
      <p class="ad__feePerTrip">
        {{ (data.ad.price * (hosts || 4) * 10) / 100 }}€
      </p>
    </div>
    <div class="ad__split" />

    <!-- Prix total -->
    <div class="ad__totalCalculation">
      <p class="ad__totalText">Total</p>
      <p class="ad__totalPerTrip">
        {{
          (data.ad.price * (hosts || 4) * 10) / 100 +
          data.ad.price * (hosts || 4)
        }}€
      </p>
    </div>

    <!-- Bouton pour réserver -->
    <NuxtLink class="cta-primary ad__bookingButton"
      >Réserver votre séjour</NuxtLink
    >
  </div>
</template>
