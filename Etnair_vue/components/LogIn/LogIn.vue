<script setup>
import "./LogIn.less";
import CloseIcon from "../../../assets/icons/close.svg";

const isSignUp = ref(false)

//Variables des inputs
const username = ref("");
const mail = ref("");
const password = ref("");

// Définir l'événement "close"
const emit = defineEmits(["close"]);

//Ferme la modale
const closeLogin = () => {
  emit("close");
};

// Fonction pour se connecter/s'inscrire
const handleSignUp = () => {
  isSignUp.value = !isSignUp.value
}

</script>

<template>
  <div class="log-in">
    <NuxtLink class="log-in__close" @click="closeLogin">
      <CloseIcon class="close__closeIcon" filled />
    </NuxtLink>
    <h3 v-if="!isSignUp" class="log-in__title">Connexion</h3>
    <h3 v-else class="log-in__title">Inscription</h3>
    <input
      v-if="isSignUp"
      class="log-in__username"
      v-model="username"
      type="test"
      placeholder="Nom d'utilisateur"
    />
    <input 
      class="log-in__mail" 
      v-model="mail" type="mail" 
      placeholder="Mail" 
      />
    <input
      class="log-in__password"
      v-model="password"
      type="password"
      placeholder="Mot de Passe"
    />

    <button v-if="isSignUp" class="log-in__upload">Télécharger une photo de profil</button>

   

    <NuxtLink v-if="!isSignUp" class="cta-primary log-in__login">Se connecter</NuxtLink>
    
    <NuxtLink v-else class="cta-primary log-in__login">S'inscrire</NuxtLink>

    <p v-if="!isSignUp" class="log-in__new-member">
      Nouveau membre ?
      <span class="cta-secondary new-member__signup" @click="handleSignUp">Crée un compte !</span>
    </p>
    <p v-else class="log-in__new-member">
      Tu as déjà un compte ?
      <span class="cta-secondary new-member__signup" @click="handleSignUp">Connecte toi !</span>
    </p>
  </div>

  <div class="background" @click="closeLogin" />
</template>
