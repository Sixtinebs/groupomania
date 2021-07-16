<template>
  <h1>Modifie ton article </h1>
  <div>
    <form class="form-update-message">
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
        placeholder="Entrez quelque chose"
        v-model="message"
        minlength="1"
        required
      ></el-input>
      <div v-if="!apercu">
        <input
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
        @click="sendUpdateMessage()"
      ></el-button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import messageService from "../service/messageService";
export default defineComponent({
  emits: ["updateMessage", "getAllMessages"],
  setup() {
    return {
      message: ref(""),
      title: ref(""),
      image: ref(""),
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    sendUpdateMessage: function () {
      let token = this.$store.state.userInfo.token;
      let formData = new FormData();
      if (this.title) {
        formData.append("title", this.title);
      }
      if (this.message) {
        formData.append("message", this.message);
      }
      if (this.image) {
        formData.append("image", this.image);
      }
      console.log(formData);
      let id = this.$route.params.id;
      messageService
        .updateMessage(id, formData, token)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      this.$emit("updateMessage");
      this.$emit("getAllMessages");
      this.$router.push({
        name: "Home",
      });
    },
  },
});
</script>

<style scoped>
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>