<script setup>
const ads = ref(null);
ads.value = getAds();

async function getAds() {
  return await $fetch("/api/ads");
}
</script>

<template>
  <div class="content wrapper is-grid">
    <h1 class="content__titre">Ventalon en Cévennes</h1>
    <h2 class="content__titre">Mes informations</h2>
    <h3 class="content__titre">
      • 5 pièces • 119m2 • 3 personnes • Jardin • Tossiat (01250)
    </h3>
    <p>
      À louer à Tossiat, charmante maison de 119 m² idéale pour 3 personnes,
      composée de 5 pièces, dont un séjour lumineux, une cuisine équipée et 2 ou
      3 chambres selon vos besoins. Cette maison offre un jardin privatif
      parfait pour la détente, une vue imprenable sur les montagnes, ainsi qu’un
      accès Wi-Fi inclus.
    <br/>
    <br/>
      Située dans un environnement paisible et verdoyant,
      elle allie la tranquillité du village à la proximité des commodités
      locales, idéale pour les amoureux de la nature et les activités de plein
      air. Disponible dès maintenant, contactez-nous pour une visite et
      découvrez cette opportunité unique !
    </p>
    <NuxtLink class="cta-primary">Se connecter</NuxtLink>
    <NuxtLink class="cta-primary-outline">Se connecter</NuxtLink>
    <NuxtLink class="cta-secondary">Modifier vos informations</NuxtLink>
  </div>
</template>

<style lang="less">
@import "@/assets/less/_import.less";

.content {
  * {
    grid-column: 3 / 11;
  }

  @media @mobile {
    & > * {
      grid-column: 1 / 7;
    }
  }

  &__titre {
  }
  .h-cta-primary {
  }
}
</style>
