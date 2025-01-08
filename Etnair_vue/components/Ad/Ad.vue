<script setup>
import "./Ad.less";

const props = defineProps({
  pictures: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="ad">
    <div class="ad__gradient" />
    <CldImage
    class="ad__picture"
    :src="pictures[0]"
    alt="Photos de la propriété"
    height="1000"
    width="2000"
    />
  </div>
</template>
