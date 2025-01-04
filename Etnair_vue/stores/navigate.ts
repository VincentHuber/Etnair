export const useGoToStore = defineStore("goTo", {
    //État initial du store
    state: () => ({
      page: "" as string | null,
    }),
  
    actions: {
      //Enregistre la page où on a cliqué
      setGoTo(pageClicked: string) {
        this.page = pageClicked;
      },
      //Réinitialise le store
      clearGoTo(){
        this.page = null
      }
    },
  });