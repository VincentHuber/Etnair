<script setup>
import "../assets/less/pages/rent.less";

//import de Date Picker
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

//Import des stores
const authStore = useAuthStore();

//Import des icons
import addIcon from "../../assets/icons/add.svg";
import UploadIcon from "../../../assets/icons/upload.svg";
import ValidateIcon from "../../../assets/icons/validate.svg";

//Variable des inputs
const title = ref(null);
const street_adress = ref(null);
const city = ref(null);
const zipcode = ref(null);
const description = ref(null);
const price = ref(null);
const number_of_guests = ref(null);
const number_of_rooms = ref(null);
const size = ref(null);
const bookable_dates = ref(null);
const pictures = ref(null);
const features = ref([]);

// Enregistre le lien de l'image uploadée
const uploadPicture = (event) => {
  pictures.value = event.info.secure_url;
};

// Fonction pour vérifier l'accès à la page
const accessPage = () => {
  if (!authStore.isAuthenticated) {
    return navigateTo("/");
  }
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

onMounted(() => {
  accessPage();
});
</script>

<template>
  <div class="rent wrapper is-grid">
    <!-- Bloc titres -->
    <h1 class="rent__title">Louer ma propriété</h1>
    <h3 class="rent__standfirst">
      Remplissez les informations ci-dessous pour présenter votre logement et
      commencer à accueillir vos futurs locataires.
    </h3>

    <!-- Input de titre -->
    <div class="rent__ad-title-container">
      <h4 class="ad-title-container__title">Titre</h4>
      <input
        v-model="title"
        type="text"
        class="ad-title-container__title-input"
        placeholder="Il doit refléter en quelques mots votre bien"
      />
    </div>

    <!-- Input des coordonnées -->
    <div class="rent__ad-contact-container">
      <h4 class="ad-contact-container__title">Coordonnées</h4>
      <input
        v-model="street_adress"
        type="text"
        class="ad-contact-container__street-adress-input"
        placeholder="Numéro et rue"
      />

      <div class="ad-contact-container__zipcode-city">
        <input
          v-model="zipcode"
          type="int"
          class="zipcode-city__input"
          placeholder="Code postal"
        />
        <input
          v-model="city"
          type="text"
          class="zipcode-city__input"
          placeholder="Ville"
        />
      </div>
    </div>

    <!-- Input de la description -->
    <div class="rent__ad-description-container">
      <h4 class="ad-description-container__title">Description</h4>
      <input
        v-model="description"
        type="text"
        class="ad-description-container__input"
        placeholder="Donnez les informations principales concernant votre logement"
      />
    </div>

    <!-- Input de la superficie et nombre de pièces -->
    <div class="rent__ad-details-container">
      <div class="ad-details-container__size">
        <h4 class="size__title">
          Superficie en m<span class="title__square">2</span>
        </h4>
        <input v-model="size" type="int" class="size__input" />
      </div>

      <div class="ad-details-container__nb-of-rooms">
        <h4 class="nb-of-rooms__title">Nombre de pièces</h4>
        <input
          v-model="number_of_rooms"
          type="int"
          class="nb-of-rooms__input"
        />
      </div>
    </div>

    <!-- Input du nombre d'invités -->
    <div class="rent__ad-guests-container">
      <h4 class="ad-guests-container__title">Nombre d'invités maximum</h4>
      <input
        v-model="number_of_guests"
        type="int"
        class="ad-guests-container__input"
      />
    </div>

    <!-- Input de prix -->
    <div class="rent__ad-price-container">
      <h4 class="ad-price-container__title">Prix par nuit en €</h4>
      <input v-model="price" type="int" class="ad-price-container__input" />
    </div>

    <!-- Input de la disponibilité -->
    <div class="rent__ad-bookables-container">
      <h4 class="ad-price-container__title">
        Début et fin de la disponibilité
      </h4>
      <Datepicker
        class="ad-bookables-container__bookables"
        v-model="bookable_dates"
        :enable-time-picker="false"
        :format="formatTravelDays"
        :format-locale="fr"
        select-text="Sélectionner"
        cancel-text="Fermer"
        range
      />
      <button class="ad-bookables-container__button">
        <addIcon class="button__addIcon" />
      </button>
    </div>

    <!-- Input des photos -->
    <div class="rent__ad-picture-container">
      <h4 class="ad-picture-container__title">Photo de votre bien</h4>
      <CldUploadWidget
        v-slot="{ open }"
        uploadPreset="etnair_preset"
        :multiple="true"
        @success="uploadPicture"
      >
        <button
          v-if="!pictures"
          type="button"
          class="ad-picture-container__upload"
          @click="open"
        >
          Télécharger une photo de profil
          <UploadIcon class="upload__uploadIcon" />
        </button>
        <button
          v-else
          type="button"
          class="ad-picture-container__upload"
          @click="open"
        >
          Photo de profil téléchargée
          <ValidateIcon class="upload__validateIcon" />
        </button>
      </CldUploadWidget>
      <p>En JPG ou PNG uniquement.</p>
    </div>

     <!-- Input des features -->
     <div class="rent__ad-price-container">
      <h4 class="ad-price-container__title">Spécificités</h4>
      
    </div>

    <NuxtLink class="cta-primary">Louer ma propriété</NuxtLink>
  </div>
</template>
