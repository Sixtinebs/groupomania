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
        class="file"
        type="file"
        ref="file"
        id="image"
        @change="selectFile"
        accept="image/png, image/jpeg"
      />
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
    selectFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
    },

    sendMessage() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("message", this.message);
      formData.append("image", this.image);

      let token = this.$store.state.userInfo.token;
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
form {
  margin: 0 20%;
}
.el-input,
.el-textarea,
.file {
  margin-bottom: 10px;
}
</style>