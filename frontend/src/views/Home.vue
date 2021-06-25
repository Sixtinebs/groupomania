<template>
  <h1>Bonjour {{ user.userProfil.name }} !</h1>
  <display-message />
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
};
</script>
<style scoped>
</style>