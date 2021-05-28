<template>

  <ul>
    <li
      v-for="item in messages"
      :key="item.message"
    >{{ item.message }}</li>
  </ul>
  <div>{{ myTest() }}</div>
</template>

<script>
const axios = require("axios");
export default {
  props: {
    unTest: String,
  },
  data() {
    return {
      messages: [],
      test: [],
    };
  },
  methods: {
    myTest() {
      this.test = this.unTest;
      return this.test;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/groupomania/message")
      .then(
        (response) => (
          (this.messages = response.data.message),
          console.log(response.data.message[1])
        )
      );
  },
};
</script>

<style>
</style>