<script setup>
import "../assets/less/pages/user.less";

const authStore = useAuthStore();

// Fonction pour vérifier l'accès à la page
const accessPage = () => {
  if (!authStore.isAuthenticated) {
    return navigateTo("/");
  }
};

onMounted(() => {
  accessPage();
});
</script>

<template>
  <div class="user wrapper is-grid">
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
          <NuxtLink class="cta-secondary">Déconnexion</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
