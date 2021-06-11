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
import messageService from "../service/messageService";
export default {
  data() {
    return {
      message: "",
      newMessages: [],
    };
  },

  methods: {
    updateMessage() {
      messageService
        .getAll()
        .then((response) => {
          this.newMessages = response.data.message;
          this.$emit("newMessage", this.newMessages);
        })
        .catch((error) => console.log(error));
    },
    sendMessage() {
      let infoMessage = {
        id: null,
        user_id: this.$store.state.userInfo.userId,
        message: this.message,
        createdAt: null,
        updatedAt: null,
      };
      messageService
        .createMessage(infoMessage)
        .then((response) => console.log(response.data.message))
        .catch((error) => console.log(error));
      this.message = "";
      //window.location.reload();
      //setTimeout(this.updateMessage(), 2000);
      this.updateMessage();
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