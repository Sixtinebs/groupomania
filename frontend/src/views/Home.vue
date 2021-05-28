<template>
  <h1>Bonjour {{ user.name }} !</h1>
  <button v-on:click="disconnection">Déconnexion</button>
  <DisplayMessage v-bind:un-test="test" />
  <CreateMessage v-bind:update-messages="updateMessages" />
  {{ updateMessages }}
</template>
<script>
import { mapState } from "vuex";
import DisplayMessage from "../components/DisplayMessage";
import CreateMessage from "../components/CreateMessage";

export default {
  props: ["updateMessages"],
  data: () => ({
    test: "mon test",
  }),
  components: {
    DisplayMessage,
    CreateMessage,
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