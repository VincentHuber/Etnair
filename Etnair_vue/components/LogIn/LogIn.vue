<script setup>
import "./LogIn.less";
import CloseIcon from "../../../assets/icons/close.svg";

//Variables pour log
const mail = ref("")
const password = ref("")

// Définir l'événement "close"
const emit = defineEmits(["close"]);

//Ferme la modale
const closeLogin = () => {
  emit("close");
};
</script>

<template>
  <div class="log-in">
    <NuxtLink class="log-in__close" @click="closeLogin">
      <CloseIcon class="close__closeIcon" filled />
    </NuxtLink>
    <h3 class="log-in__title">Connexion</h3>

    <input
        class="log-in__mail"
        v-model="mail"
        type="mail"
        placeholder="Mail"
      />
      <input
        class="log-in__password"
        v-model="password"
        type="password"
        placeholder="Mot de Passe"
      />

      <NuxtLink class="cta-primary log-in__login">Se connecter</NuxtLink>
      <p  class="log-in__new-member">Nouveau membre ? <span class=" cta-secondary new-member__signup">Crée un compte !</span></p>
  </div>

  <div class="background" @click="closeLogin" />
</template>
