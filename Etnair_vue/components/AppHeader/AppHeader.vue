<script setup>
import searchIcon from "../../assets/icons/search.svg";
import addIcon from "../../assets/icons/add.svg";
import userIcon from "../../assets/icons/user.svg";
import userHoverIcon from "../../assets/icons/user-hover.svg";
import "./AppHeader.less";

//Gère le survol
const isUserHovered = ref(false);
const isAddHovered = ref(false);

const search = ref([]);
</script>

<template>
  <div class="app-header">
    <!-- Logo -->
    <h1 class="app-header__title">Etnair</h1>

    <!-- Barre de recherche -->
    <div class="app-header__search-bar">
      <NuxtLink>
        <searchIcon class="search-bar__searchIcon" />
      </NuxtLink>
      <input v-model="search" type="text" placeholder="Destination" />
      <input v-model="search" type="date" placeholder="Arrivée" />
      <input v-model="search" type="date" placeholder="Départ" />
      <input v-model="search" type="date" placeholder="Voyageurs" />

    </div>

    <!-- Boutons pour l'user -->
    <div class="app-header__user">
      <NuxtLink
        @mouseover="isAddHovered = true"
        @mouseleave="isAddHovered = false"
        class="user__rent"
      >
        <addIcon class="rent__addIcon" />
        <p class="rent__text-rent" :class="{ 'no-line': isAddHovered }">
          Louer ma propriété
        </p>
      </NuxtLink>
      <NuxtLink
        @mouseover="isUserHovered = true"
        @mouseleave="isUserHovered = false"
        class="user__login"
      >
        <userIcon v-if="!isUserHovered" class="login__userIcon" />
        <userHoverIcon v-if="isUserHovered" class="login__userHoverIcon" />
      </NuxtLink>
    </div>
  </div>
</template>
