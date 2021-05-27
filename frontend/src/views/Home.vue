<template>
  <h1>Bonjour {{ user.name }} !</h1>
  <button v-on:click="disconnection">Déconnexion</button>
  <DisplayMessage />
</template>
<script>
import { mapState } from "vuex";
import DisplayMessage from "../components/DisplayMessage";
export default {
  components: {
    DisplayMessage,
  },
  computed: {
    ...mapState(["status", "user", "userInfo"]),
  },
  mounted() {
    const id = this.$store.state.userInfo.userId;
    this.$store.dispatch("getUser", id);
  },
  methods: {
    disconnection: function () {
      this.$store.dispatch("disconnectUser", {
        userId: -1,
        token: "",
      });
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped>
</style>