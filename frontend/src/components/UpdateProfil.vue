<template>
  <div>
    <el-button
      type="primary"
      @click="editPost"
    >Modifier</el-button>
    <el-button type="danger">Supprimer</el-button>
  </div>
  <div class="form-container">
    <el-input
      placeholder="Entrez votre nom"
      v-model="name"
    ></el-input>
    <el-input
      placeholder="Entrez votre e-mail"
      v-model="email"
    ></el-input>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="sendNewData"
    ></el-button>
  </div>
</template>
<script>
import { ref } from "vue";
import userService from "../service/userService";
export default {
  setup() {
    return {
      name: ref(""),
      email: ref(""),
    };
  },
  methods: {
    editPost() {
      console.log(this.name, this.email);
    },
    // getUser() {
    //   let id = this.$store.state.userInfo.userId;
    //   userService
    //     .getUser(id)
    //     .then(() => this.$store.dispatch("getUser", id))
    //     .catch((error) => console.log(error));
    // },
    sendNewData() {
      let token = this.$store.state.userInfo.token;
      let id = this.$store.state.userInfo.userId;
      let data = {
        name: this.name,
        email: this.email,
      };
      console.log(id, token, data);
      userService
        .modifyUser(id, token, data)
        .then(() => {
          this.$store.dispatch("getUser", id);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
</style>