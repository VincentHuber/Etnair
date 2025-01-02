<script setup>
import "./AppHeader.less";

//import des stores
const authStore = useAuthStore();
const loginStore = useLoginStore();
const goToStore = useGoToStore()

//import de Date Picker
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

//Import des icones
import searchIcon from "../../assets/icons/search.svg";
import addIcon from "../../assets/icons/add.svg";
import userIcon from "../../assets/icons/user.svg";
import userHoverIcon from "../../assets/icons/user-hover.svg";

//Gère le survol
const isUserHovered = ref(false);
const isAddHovered = ref(false);

//Variable pour la barre de recherche
const destination = ref(null);
const travelDays = ref(null);
const guests = ref(null);

const isMobile = ref(null)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 1135;
};

//Formate la date
const formatTravelDays = (dates) => {
  if (Array.isArray(dates)) {
    return dates
      .map((date) => format(date, "dd/MM/yyyy", { locale: fr }))
      .join(" - ");
  }
  return format(dates, "dd/MM/yyyy", { locale: fr });
};

//Lien info user
const goToUser = () => {
  if (authStore.isAuthenticated) {
    navigateTo("/user");
  } else {
    goToStore.setGoTo("/user")
    loginStore.setIsLoginVisible(true);
  }
};

//Lien pour ajouter une annonce
const goToAddRent = () => {
  if (authStore.isAuthenticated) {
    navigateTo("/rent");
  } else {
    goToStore.setGoTo("/rent")
    loginStore.setIsLoginVisible(true);
  }
};

//Vérifie la largeur de la fenêtre
onMounted(()=>{
  updateIsMobile()
  window.addEventListener("resize", updateIsMobile);
})

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<template>
  <div class="app-header">
    <!-- Logo -->
    <NuxtLink to="/" class="app-header__title">Etnair </NuxtLink>

    <!-- Barre de recherche -->
    <div v-if="!isMobile" class="app-header__search-bar">
      <NuxtLink class="search-bar__search">
        <searchIcon class="search__searchIcon" />
      </NuxtLink>
      <input
        class="search-bar__destination"
        v-model="destination"
        type="text"
        placeholder="Destination"
      />
      <Datepicker
        class="search-bar__arrival"
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
        class="search-bar__guests"
        v-model.number="guests"
        type="numb"
        placeholder="Nombre de voyageurs"
      />
    </div>

    <!-- Boutons pour l'user -->
    <div class="app-header__user">
      <NuxtLink
        v-if="!isMobile"
        @mouseover="isAddHovered = true"
        @mouseleave="isAddHovered = false"
        class="user__rent"
        @click="goToAddRent"
      >
        <addIcon class="rent__addIcon" />
        <p class="rent__text-rent" :class="{ 'no-line': isAddHovered }">
          Louer ma propriété
        </p>
      </NuxtLink>
      <NuxtLink
        v-else
        class="user__rent"
      >
      <searchIcon class="rent__searchIcon" />
      <p class="rent__text-rent">
          Recherche
        </p>
      </NuxtLink>

      <NuxtLink
        @mouseover="isUserHovered = true"
        @mouseleave="isUserHovered = false"
        class="user__login"
        @click="goToUser"
      >
        <userIcon v-if="!isUserHovered" class="login__userIcon" />
        <userHoverIcon v-if="isUserHovered" class="login__userHoverIcon" />
      </NuxtLink>
    </div>
  </div>
</template>
