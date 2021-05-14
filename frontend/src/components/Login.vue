<template>
  <section class="component-login">
    <form @submit.prevent="addUser">
      <div>
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" v-model="email" />
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
        <button type="submit" @click="connectUser">Se connecter</button>
      </div>
    </form>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
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
};
</script>

<style>
</style>