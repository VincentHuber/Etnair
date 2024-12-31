<script setup>
const loginStore = useLoginStore();
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <LogIn v-if="loginStore.isLoginVisible" />
    <AppHeader/>
    <NuxtPage />
  </div>
</template>
