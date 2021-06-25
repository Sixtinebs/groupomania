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
  emits: ["updateMessage"],
  setup() {
    return {
      message: ref(""),
      title: ref(""),
    };
  },
  methods: {
    sendUpdateMessage: function () {
      let token = this.$store.state.userInfo.token;
      let infoMessages = {
        title: this.title,
        message: this.message,
      };
      let id = this.$route.params.id;
      messageService
        .updateMessage(id, infoMessages, token)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      this.$emit("updateMessage");
      this.$router.push({
        name: "Home",
      });
    },
  },
});
</script>

<style scoped>
</style>