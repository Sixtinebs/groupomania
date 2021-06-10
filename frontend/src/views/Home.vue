<template>
  <h1>Bonjour {{ user.name }} !</h1>
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
    console.log(id);
    this.$store.dispatch("getUser", id);
  },
};
</script>
<style scoped>
</style>