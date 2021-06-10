<template>
  <h1>Bonjour {{ user.name }} !</h1>
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
    console.log(id);
    this.$store.dispatch("getUser", id);
  },
};
</script>
<style scoped>
</style>