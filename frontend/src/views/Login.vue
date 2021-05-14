<template>
  <section class="component-login">
    <h1>Connectez-vous !</h1>
    <form @submit.prevent="addUser">
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
          @click="connectUser"
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
import { ref } from "vue";
export default {
  // data: function () {
  //   let email = ref("");
  //   let password = ref("");
  //   return {
  //     email,
  //     password,
  //   };
  // },
  setup() {
    let email = ref("");
    let password = ref("");
    let connectUser = function () {
      console.log(email.value, password.value);
    };
    return {
      email,
      password,
      connectUser,
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
  },
};
</script>

<style>
</style>