<template>

  <ul>
    <li
      v-for="item in messages"
      :key="item.message"
    >{{ item.message }}</li>
  </ul>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/groupomania/message")
      .then((response) => (this.messages = response.data.message));
  },
};
</script>

<style>
</style>