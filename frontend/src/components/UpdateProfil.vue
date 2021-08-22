<template>
  <div>
    <el-button
      type="primary"
      class="btn"
      @click="editProfil"
    >Modifier</el-button>
    <el-popover
      placement="top"
      :width="160"
      v-model:visible="visible"
    >
      <p>Voulez-vous vraiment supprimer votre profil?</p>
      <div style="text-align: right; margin: 0">
        <el-button
          size="mini"
          type="text"
          @click="visible = false"
        >Annuler</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="removeProfil"
        >Confirmer</el-button>
      </div>
      <template #reference>
        <el-button
          type="danger"
          class="btn"
          @click="visible = true"
        >Supprimer</el-button>
      </template>
    </el-popover>

  </div>
  <div id="form-container">
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
      class="btn"
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
      isDisplay: false,
      visible: ref(false),
    };
  },
  methods: {
    editProfil() {
      let form = document.getElementById("form-container");
      if (this.isDisplay) {
        this.isDisplay = !this.isDisplay;
        form.style.visibility = "hidden";
      } else {
        this.isDisplay = !this.isDisplay;
        form.style.visibility = "visible";
      }
    },

    sendNewData() {
      let token = this.$store.state.userInfo.token;
      let id = this.$store.state.userInfo.userId;
      const data = {};
      if (this.name) {
        data.name = this.name;
      }
      if (this.email) {
        data.email = this.email;
      }
      userService
        .modifyUser(id, token, data)
        .then(() => {
          this.$store.dispatch("getUser", id);
        })
        .catch((error) => console.log(error));
    },
    removeProfil() {
      let token = this.$store.state.userInfo.token;
      let id = this.$store.state.userInfo.userId;
      this.visible = false;
      userService
        .deleteUser(id, token)
        .then(() => {
          this.$store.dispatch("disconnectUser", {
            userId: -1,
            token: "",
            user: {},
          });
          localStorage.clear();
          this.$router.push({ path: "/" });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
#form-container {
  visibility: hidden;
  margin: 40px 400px;
}
</style>