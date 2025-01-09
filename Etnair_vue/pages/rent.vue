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
import { featuresInfos } from "@/utils/featuresInfos";

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
const bookable_dates = ref([]);
const pictures = ref([]);
const features = ref([]);

const isFeature = ref(false);

//Ajoute la feature ou supprime si elle est déjà sélectionné
const addFeature = (newFeature) => {
  if (features.value.includes(newFeature)) {
    features.value = features.value.filter((feature) => feature != newFeature);
    isFeature.value = false;
  } else {
    features.value.push(newFeature);
    isFeature.value = true;
  }
};

//Efface la photo
const erasePicture = (undesiredPicture) => {
  if (pictures.value.includes(undesiredPicture)) {
    pictures.value = pictures.value.filter(
      (picture) => picture != undesiredPicture
    );
  }
};

// Enregistre le lien de l'image uploadée
const uploadPicture = (event) => {
  const imageUrl = event?.info?.secure_url;
  imageUrl && pictures.value.push(imageUrl);
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


//Crée une annonce
const handleRenting = async () => {
  //Crée l'objet à envoyer dans le back
  const rentingData = {
    title: title.value,
    description: description.value,
    street_adress: street_adress.value,
    zipcode: Number(zipcode.value),
    city: city.value,
    price: Number(price.value),
    number_of_guests: Number(number_of_guests.value),
    number_of_rooms: Number(number_of_rooms.value),
    size: Number(size.value),
    bookable_dates: bookable_dates.value.map(date => date.toISOString()),
    pictures: [...pictures.value],
    features: [...features.value],
  };

  //Crée une annonce dans le back
  try {
    const response = await $fetch("/api/ads", {
      method: "POST",
      body: rentingData,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        "Content-Type": "application/json",
      },
    });

    // Met à jour le store avec l'annonce et renvoie à la page de profil
    if (response?.data) {
      authStore.updateNewAd(response.data)
      navigateTo('/user')
      
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce", error);
  }
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
          class="zipcode-city__zipcode-input"
          placeholder="Code postal"
        />
        <input
          v-model="city"
          type="text"
          class="zipcode-city__city-input"
          placeholder="Ville"
        />
      </div>
    </div>

    <!-- Input de la description -->
    <div class="rent__ad-description-container">
      <h4 class="ad-description-container__title">Description</h4>
      <textarea
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
          Superficie en m<sup class="title__square">2</sup>
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
      <div class="ad-bookables-container__content">
        <Datepicker
          class="content__bookables"
          v-model="bookable_dates"
          :enable-time-picker="false"
          :format="formatTravelDays"
          :format-locale="fr"
          select-text="Sélectionner"
          cancel-text="Fermer"
          range
        />
        <button class="content__button">
          <addIcon class="button__addIcon" />
        </button>
      </div>
    </div>

    <!-- Input des photos -->
    <div class="rent__ad-picture-container">
      <h4 class="ad-picture-container__title">Photos de votre propriété</h4>
      <CldUploadWidget
        v-slot="{ open }"
        uploadPreset="etnair_preset"
        :multiple="true"
        @success="uploadPicture"
      >
        <button
          type="button"
          class="ad-picture-container__upload"
          @click="open"
        >
          Télécharger des photos
          <UploadIcon class="upload__uploadIcon" />
        </button>
      </CldUploadWidget>
      <p class="ad-picture-container__details">En JPG ou PNG uniquement.</p>
    </div>

    <!-- Affiche les photos -->
    <div class="rent__pictures">
      <div v-for="(picture, index) in pictures" class="pictures__container">
        <CldImage
          :key="index"
          :src="picture"
          alt="Photos de la propriété"
          class="container__item"
        />
        <button
          class="cta-secondary container__button"
          @click="erasePicture(picture)"
        >
          Supprimer
        </button>
      </div>
    </div>

    <!-- Input des features -->
    <div class="rent__ad-features-container">
      <h4 class="ad-features-container__title">Spécificités</h4>

      <div class="ad-features-container__content">
        <button
          v-for="feature in featuresInfos"
          :key="feature.id"
          class="content__features"
          @click="addFeature(feature.text)"
          :class="{ 'is-active': features.includes(feature.text) }"
        >
          <component :is="feature.icon" class="features__icon" />
          <span class="features__text">{{ feature.text }}</span>
        </button>
      </div>
    </div>

    <NuxtLink class="cta-primary rent__validate" @click="handleRenting"
      >Louer ma propriété</NuxtLink
    >
  </div>
</template>
