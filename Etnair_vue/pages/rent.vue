<script setup>
import '../assets/less/pages/rent.less'

const store = useAuthStore();

// Fonction pour vérifier l'accès à la page
const accessPage = () => {
  if (!store.isAuthenticated) { 
    return navigateTo('/');
  }
};

onMounted(() => {
  accessPage();
});

</script>

<template>
    <div>
        <h1>Rent</h1>
    </div>
</template>
