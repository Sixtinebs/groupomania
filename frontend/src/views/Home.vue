<template>
  <h1>Bonjour {{ user.name }} !</h1>
  <button>Déconnexion</button>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["status", "user", "userInfo"]),
  },
  mounted() {
    const id = this.$store.state.userInfo.userId;
    console.log(id);
    if (id == -1) {
      this.$router.push({ path: "/" });
      return;
    }
    this.$store.dispatch("getUser", id);
  },
};
</script>
<style scoped>
</style>