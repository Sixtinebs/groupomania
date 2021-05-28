<template>
  <form>
    <label for="message"></label>
    <el-input
      type="text"
      :rows="2"
      placeholder="Votre message"
      id="message"
      name="message"
      minlength="1"
      required
      v-model="message"
    >
    </el-input>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="sendMessage"
    ></el-button>
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
      //this.updateMessage();
      //$el.$forceUpdate();
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  vertical-align: bottom;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 10px;
}
.el-input__inner {
  border-radius: 4px 0 0 4px;
}
.el-button {
  border-radius: 0 4px 4px 0;
}
</style>