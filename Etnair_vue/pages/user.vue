<script setup>
import '../assets/less/pages/user.less'
 
const authStore = useAuthStore();

// Fonction pour vérifier l'accès à la page
const accessPage = () => {
  if (!authStore.isAuthenticated) { 
    return navigateTo('/');
  }
};

onMounted(() => {
  accessPage();
});


</script>

<template>
    <div>
        <h1>User page</h1>
    </div>
</template>
