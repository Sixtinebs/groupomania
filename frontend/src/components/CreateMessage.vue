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
    <div v-if="!image">
      <input
        type="file"
        ref="file"
        id="image"
        @change="selectFile"
        accept="image/png, image/jpeg"
      />
    </div>
    <div v-else>
      <img :src="image" />
    </div>

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
  setup() {
    return {
      title: ref(""),
      message: ref(""),
      newMessages: [],
      image: ref(""),
    };
  },

  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    sendMessage() {
      let formData = new FormData();

      // let infoMessage = {
      //   id: null,
      //   user_id: this.$store.state.userInfo.userId,
      //   title: this.title,
      //   message: this.message,
      //   createdAt: null,
      //   updatedAt: null,
      // };
      formData.append("title", this.title);
      formData.append("message", this.message);
      formData.append("image", this.image);

      let token = this.$store.state.userInfo.token;
      console.log("formData", formData);
      messageService
        .createMessage(formData, token)
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
</style>