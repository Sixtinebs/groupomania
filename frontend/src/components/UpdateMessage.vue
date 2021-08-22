<template>
  <h1>Modifie ton article </h1>
  <div>
    <form class="form-update-message">
      <el-input
        type="text"
        :rows="2"
        placeholder="Votre title"
        id="title"
        name="title"
        minlength="1"
        required
        v-model="title"
        :value="infoPost.title"
      >
      </el-input>
      <el-input
        type="textarea"
        placeholder="Entrez quelque chose"
        id="text"
        name="text"
        v-model="infoPost.message"
        minlength="1"
        :value="infoPost.message"
        required
      >
      </el-input>
      <div>
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
      text: ref(""),
      title: ref(""),
      image: ref(""),
      infoPost: ref([]),
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
      if (this.infoPost.message) {
        formData.append("message", this.infoPost.message);
      }
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("user_id", this.infoPost.user_id);
      let id = this.$route.params.id;
      messageService
        .updateMessage(id, formData, token)
        .then((response) => console.log(response.data.message))
        .catch((error) => console.log(error));
      this.$emit("updateMessage");
      this.$emit("getAllMessages");
      this.$router.push({
        name: "Home",
      });
    },
    getMessage() {
      let token = this.$store.state.userInfo.token;
      let id = this.$route.params.id;
      messageService
        .getOneMessage(id, token)
        .then((response) => (this.infoPost = response.data.message))
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.getMessage();
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
form {
  margin: 0 20%;
}
.el-input,
.el-textarea,
.file {
  margin-bottom: 10px;
}
</style>