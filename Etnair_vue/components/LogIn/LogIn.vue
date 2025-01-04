<script setup>
import "./LogIn.less";
import CloseIcon from "../../../assets/icons/close.svg";
import UploadIcon from "../../../assets/icons/upload.svg";
import ValidateIcon from "../../../assets/icons/validate.svg";

const isSignUp = ref(false);

//import du store
const loginStore = useLoginStore();
const authStore = useAuthStore();
const goToStore = useGoToStore()

//Variables des inputs
const nickname = ref("");
const mail = ref("");
const password = ref("");
const picture = ref("");

//Fermer la modale de login
const closeLogin = () => {
  loginStore.setIsLoginVisible(false);
};

// Fonction pour se connecter/s'inscrire
const handleSignUp = () => {
  isSignUp.value = !isSignUp.value;
};

// Enregistre le lien de l'image uploadée
const uploadPicture = (event) => {
  picture.value = event.info.secure_url;
};

// Fonction pour s'inscrire
const handleSignup = async () => {

  //Formatage du nickname avec une majuscule à la première lettre
  const formatNickname =
    nickname.value.charAt(0).toUpperCase() +
    nickname.value.slice(1).toLowerCase();

  //Formatage du mail en minuscule
  const formatMail = mail.value.toLowerCase()

  //Crée l'objet à envoyer dans le back
  const userData = {
    nickname: formatNickname,
    email: formatMail,
    password: password.value,
    picture: picture.value,
  };

  try {
    //Envoie l'user dans le back
    const response = await $fetch("/api/users", {
      method: "POST",
      body: userData,
    });

    if (response?.data) {
      navigateTo(goToStore.page)
      authStore.setUser(response.data)
      authStore.setToken(response.data.token)
      goToStore.clearGoTo()
      closeLogin()
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
  }
};

// Fonction pour se connecter
const handleSignin = async () => {

  //Formatage du mail en minuscule
  const formatMail = mail.value.toLowerCase()

  //Crée l'objet à envoyer dans le back
  const userData = {
    email: formatMail,
    password: password.value,
  };

  try {
    //Envoie l'user dans le back
    const response = await $fetch("/api/auth", {
      method: "POST",
      body: userData,
    });

    if (response?.data) {
      navigateTo(goToStore.page)
      authStore.setUser(response.data)
      authStore.setToken(response.data.token)
      goToStore.clearGoTo()
      closeLogin()
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
  }
};
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
      class="log-in__nickname"
      v-model="nickname"
      type="text"
      placeholder="Nom d'utilisateur"
    />
    <input class="log-in__mail" v-model="mail" type="mail" placeholder="Mail" />
    <input
      class="log-in__password"
      v-model="password"
      type="password"
      placeholder="Mot de passe"
    />

    <CldUploadWidget
      v-slot="{ open }"
      v-if="isSignUp"
      uploadPreset="etnair_preset"
      :multiple="false"
      @success="uploadPicture"
    >
      <button
        v-if="!picture"
        type="button"
        class="log-in__upload"
        @click="open"
      >
        Télécharger une photo de profil
        <UploadIcon class="upload__uploadIcon" />
      </button>
      <button v-else type="button" class="log-in__upload" @click="open">
        Photo de profil téléchargée
        <ValidateIcon class="upload__validateIcon" />
      </button>
    </CldUploadWidget>

    <NuxtLink 
      v-if="!isSignUp" 
      class="cta-primary log-in__login"
      @click="handleSignin">
        Se connecter</NuxtLink
    >

    <NuxtLink 
      v-else 
      class="cta-primary log-in__login" 
      @click="handleSignup">
        S'inscrire</NuxtLink
    >

    <p v-if="!isSignUp" class="log-in__new-member">
      Nouveau membre ?
      <span class="cta-secondary new-member__signup" @click="handleSignUp"
        >Crée un compte !</span
      >
    </p>
    <p v-else class="log-in__new-member">
      Tu as déjà un compte ?
      <span class="cta-secondary new-member__signup" @click="handleSignUp"
        >Connecte toi !</span
      >
    </p>
  </div>

  <div class="background" @click="closeLogin" />
</template>
