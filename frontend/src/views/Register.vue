<template>
  <h1>Créer un compte Groupomania</h1>

  <section>
    <form>
      <div>
        <label for="name">Nom</label>
        <el-input
          type="text"
          id="name"
          name="name"
          placeholder="Votre Nom"
          v-model="name"
        ></el-input>
      </div>
      <div>
        <label for="email">E-mail</label>
        <el-input
          type="email"
          id="email"
          name="email"
          placeholder="Votre email"
          v-model="email"
        ></el-input>
      </div>
      <div>
        <label for="password">Mot de Passe</label>
        <el-input
          type="passord"
          id="password"
          name="password"
          placeholder="Mot de passe"
          v-model="password"
          show-password
        ></el-input>
      </div>
      <div>
        <el-button
          v-if="disabled=!validatedFields"
          type="primary"
          disabled
          round
        >Se connecter</el-button>
        <el-button
          type="primary"
          v-else-if="status =='loading'"
          :loading="true"
        >Chargement</el-button>
        <el-button
          v-else
          type="primary"
          class="button"
          round
          @click="addUser"
        >
          Se connecter
        </el-button>
      </div>
    </form>
  </section>
</template>


<script>
//import { mapState } from "vuex";

export default {
  data: function () {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.name != "" && this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },

    //...mapState(["status"]),
  },
  mounted() {
    const id = this.$store.state.userInfo.userId;
    if (id !== -1) {
      this.$router.push({ path: "/home" });
      return;
    }
  },
  methods: {
    addUser: function () {
      //for access element this
      const self = this;
      //action trigger => dispatch
      this.$store
        .dispatch("addUser", {
          id: null,
          email: this.email,
          password: this.password,
          name: this.name,
          //isAdmin: false,
          createdAt: null,
          updatedAt: null,
        })
        .then(
          function () {
            self.$router.push({ name: "Home" });
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
</style>
