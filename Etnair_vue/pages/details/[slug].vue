<script setup>
import "../assets/less/pages/details.less";

const data = ref(null);
const route = useRoute();

// Import des icons
import { featuresInfos } from "@/utils/featuresInfos";

// Récupère l'annonce
const fetchData = async () => {
  try {
    data.value = await $fetch(`/api/ad/${route.params.slug}`, {
      method: "get",
    });
  } catch (err) {
    console.error(err);
  }
};

// Le slug est accessible uniquement quand le DOM est monté
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="data && data.ad" class="ad wrapper is-grid">
    <div class="ad__adRenter">
      <CldImage
        class="adRenter__picture"
        :src="data.ad.renter.picture"
        alt="Photos du propriétaire"
        height="100"
        width="100"
      />
      <NuxtLink class="cta-secondary adRenter__nickname">
        {{ data.ad.renter.nickname }}
      </NuxtLink>
    </div>
    <h1 class="ad__adTitle">{{ data.ad.title }}</h1>
    <h3 class="ad__adInfos">
      {{ data.ad.size }} m<sup>2</sup> • {{ data.ad.number_of_rooms }} pièces •
      {{ data.ad.number_of_guests }} personnes • {{ data.ad.city }} ({{
        data.ad.zipcode
      }})
    </h3>

    <CldImage
      class="ad__adPicture"
      :src="data.ad.pictures[0]"
      alt="Photos de couverture du bien"
      height="1000"
    />
    <p>{{ data.ad.description }}</p>

    <div class="ad__adFeatures">

        <div
          v-for="(feature, key) in data.ad.features"
          :key="key"
        >
          <Features :text="feature" />
        </div>
    </div>
  </div>
</template>
