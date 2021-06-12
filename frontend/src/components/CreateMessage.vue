<template>
  <form>
    <label for="message"></label>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="text"
      :rows="2"
      placeholder="Votre message"
      id="message"
      name="message"
      minlength="1"
      required
      v-model="title"
    >
    </el-input>
    <el-input
      type="textarea"
      placeholder="Votre message"
      id="message"
      name="message"
      minlength="1"
      required
      v-model="message"
      show-word-limit
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
import messageService from "../service/messageService";
import { ref } from "vue";
export default {
  emits: ["reloadMessage"],
  // data() {
  //   return {
  //     message: "",
  //     newMessages: [],
  //   };
  // },
  setup() {
    return {
      title: ref(""),
      message: ref(""),
      newMessages: [],
    };
  },

  methods: {
    sendMessage() {
      let infoMessage = {
        id: null,
        user_id: this.$store.state.userInfo.userId,
        title: this.title,
        message: this.message,
        createdAt: null,
        updatedAt: null,
      };
      let token = this.$store.state.userInfo.token;
      messageService
        .createMessage(infoMessage, token)
        .then((response) => console.log(response.data.message))
        .catch((error) => console.log(error));
      this.title = "";
      this.message = "";
      this.$emit("reloadMessage");
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style scoped>
/* form {
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
} */
</style>