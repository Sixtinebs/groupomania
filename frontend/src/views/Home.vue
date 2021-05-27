<template>
  <h1>Bonjour {{ user.name }} !</h1>
  <button v-on:click="disconnection">Déconnexion</button>

</template>
<script>
import { mapState } from "vuex";
export default {
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