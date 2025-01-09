<script setup>
import { featuresInfos } from "@/utils/featuresInfos";
import "./Features.less"


const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

// Recherche de l'icon correspondant au texte
const icon = computed(() => {
  const feature = featuresInfos.find(info => info.text === props.text);
  return feature ? feature.icon : null;
});
</script>

<template>
  <div class="content">
    <component :is="icon" class="content__icon" />
    <span class="content__text">{{ text }}</span>
  </div>
</template>
