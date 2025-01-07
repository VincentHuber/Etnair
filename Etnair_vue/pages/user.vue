<script setup>
import "../assets/less/pages/user.less";

// Import des stores
const authStore = useAuthStore();

//Import de l'icon
import addIcon from "../../assets/icons/add.svg";

//Gère le survol du bouton
const isAddHovered = ref(false);

// Fonction pour vérifier l'accès à la page
const accessPage = () => {
  if (!authStore.isAuthenticated) {
    return navigateTo("/");
  }
};

//Lien pour ajouter une annonce
const goToAddRent = () => {
  navigateTo("/rent");
};

//Fonction pour se déconnecter
const loggingOut = () => {
  authStore.clearToken();
  authStore.clearUser();
  navigateTo("/");
};

onMounted(() => {
  accessPage();
  console.log("authStore.user : ", authStore.user);
});
</script>

<template>
  <div class="user wrapper is-grid">
    <!-- User informations -->
    <h2 class="user__pageTitle">Mes informations</h2>
    <div class="user__infos">
      <CldImage
        :src="authStore.user.picture"
        class="infos__pictureProfile"
        alt="Photo de profil"
      />
      <div class="infos__container">
        <div class="container__nickname">
          <p class="nickname__title">Nom d'utilisateur</p>
          <p class="nickname__text">{{ authStore.user.nickname }}</p>
        </div>
        <div class="container__email">
          <p class="email__title">Email</p>
          <p class="email__text">{{ authStore.user.email }}</p>
        </div>
        <div class="container__password">
          <p class="password__title">Mot de passe</p>
          <p class="password__text">********</p>
        </div>
        <div class="container__button">
          <NuxtLink class="cta-secondary">Modifier mes informations</NuxtLink>
          <NuxtLink class="cta-secondary" @click="loggingOut"
            >Déconnexion</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Ads informations -->
    <div class="user__title-container">
      <h2 class="title-container__pageTitle">Mon annonce</h2>
      <NuxtLink
        @mouseover="isAddHovered = true"
        @mouseleave="isAddHovered = false"
        class="title-container__rent"
        @click="goToAddRent"
      >
        <addIcon class="rent__addIcon" />
        <p class="rent__text-rent" :class="{ 'no-line': isAddHovered }">
          Louer ma propriété
        </p>
      </NuxtLink>
    </div>

    <div v-if="authStore.user.ads.length === 0" class="user__no-ad">
      <p class="no-ad__title">Aucune annonce</p>
    </div>

    <div v-else>
      <div v-for="ad in authStore.user.ads" :key="ad.id" class="user__ads">
        <CldImage
          :src="ad.pictures[0]"
          alt="Photos de la propriété"
          class="ads__picture"
        />
        <div class="ads__description">
          <h3 class="description__title">{{ ad.title }}</h3>
          <p class="description__address">
            {{ ad.street_adress }}
          </p>
          <p class="description__address">
            {{ ad.city }} ({{ ad.zipcode.toString() }})
          </p>
          <NuxtLink class="cta-secondary description__button"
            >Modifier mon annonce</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Bookings informations -->
    <h2 class="user__pageTitle">Ma réservation</h2>
    <div class="user__bookings">
      <p class="bookings__no-booking">Aucune réservation</p>
    </div>
  </div>
</template>
