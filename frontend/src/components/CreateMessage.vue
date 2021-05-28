<template>
  <form @submit.prevent="sendMessage">
    <label for="message"></label>
    <input
      type="text"
      id="message"
      name="message"
      minlength="1"
      required
      v-model="message"
    >
    <button>Envoyer</button>
  </form>

</template>

<script>
const axios = require("axios");
export default {
  props: {
    updateMessages: Object,
  },
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  methods: {
    updateMessage: function () {
      axios
        .get("http://localhost:3000/groupomania/message")
        .then(
          (response) => (
            (this.messages = response.data.message),
            console.log("new req", response.data.message)
          )
        );
    },
    sendMessage: function () {
      console.log(this.message);
      axios
        .post("http://localhost:3000/groupomania/message", {
          id: null,
          user_id: this.$store.state.userInfo.userId,
          message: this.message,
          createdAt: null,
          updatedAt: null,
        })
        .then((response) => console.log(response.data.message));
      this.message = "";
      this.updateMessage();
    },
  },
};
</script>

<style>
</style>