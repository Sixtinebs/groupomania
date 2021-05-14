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
          Se connecter
        </button>
      </div>
    </form>
  </section>
</template>

<script>
//import { ref } from "vue";
export default {
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  // setup() {
  //   let email = ref("");
  //   let password = ref("");
  //   let connectUser = function () {
  //     console.log(email.value, password.value);
  //   };
  //   return {
  //     email,
  //     password,
  //     connectUser,
  //   };
  // },
  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    connectUser: function () {
      this.$store
        .dispatch("connectUser", {
          email: this.email,
          password: this.password,
        })
        .then(
          function (response) {
            console.log(response);
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