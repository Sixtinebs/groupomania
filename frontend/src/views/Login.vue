<template>
  <section class="component-login">
    <h1>Connectez-vous !</h1>
    <form @submit.prevent="connectUser">
      <div>
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
        />
      </div>
      <div>
        <label for="password">Mot de Passe</label>
        <input
          type="passord"
          id="password"
          name="password"
          v-model="password"
        />
      </div>
      <div>
        <button
          :disabled='!validatedFields'
          class="button"
        >
          <span v-if="status =='loading'"> En cour de connexion en cours ... </span>
          <span v-else>Se connecter</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status", "user", "userInfo"]),
  },
  mounted() {
    const id = this.$store.state.userInfo.userId;
    if (id !== -1) {
      this.$router.push({ path: "/home" });
      return;
    }
  },
  methods: {
    connectUser: function () {
      const self = this;
      this.$store
        .dispatch("connectUser", {
          email: this.email,
          password: this.password,
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