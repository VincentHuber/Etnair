<script setup>
import '../assets/less/pages/user.less'
 
import { useAuthStore } from '../stores/auth';


const store = useAuthStore(); // Initialisation du store

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
        <h1>User page</h1>

    </div>
</template>
