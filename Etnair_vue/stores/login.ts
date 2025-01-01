export const useLoginStore = defineStore("login", {
  //État initial du store
  state: () => ({
    isLoginVisible: false as boolean,
  }),

  actions: {
    //Affiche ou pas la modale de login
    setIsLoginVisible(newLogin: boolean) {
      this.isLoginVisible = newLogin;
    },
  },
});
