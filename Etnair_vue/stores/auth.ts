export const useAuthStore = defineStore("auth", {
  //État initial du store
  state: () => ({
    token: null as string | null,
    user: null as object | null,
  }),

  persist: true,

  actions: {
    //Enregistre un token
    setToken(newToken: string) {
      this.token = newToken;
    },

    //Supprime un token
    clearToken() {
      this.token = null;
    },

    //Enregistre les infos d'un user
    setUser(userData: object) {
      this.user = userData;
    },

    //Supprime les infos d'un user
    clearUser() {
      this.user = null;
    },

    //Met à jour les annonces de l'user
    updateNewAd(newAd: object) {
      this.user.ads.push(newAd);
    },
  },

  //Vérifie si un user est connecté
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
