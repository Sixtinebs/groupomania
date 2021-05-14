<template>
  <h1>Créer un compte Groupomania</h1>

  <section>
    <form @submit.prevent="addUser">
      <div>
        <label for="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="name"
        />
      </div>
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
          class="button"
          :disabled='!validatedFields'
          @click="addUser"
        >Créer votre compte</button>
      </div>
    </form>
  </section>
</template>


<script>
import { ref } from "vue";
export default {
  setup() {
    let name = ref("");
    let email = ref("");
    let password = ref("");
    let addUser = function () {
      console.log(name.value, email.value, password.value);
      name.value = "";
      email.value = "";
      password.value = "";
    };
    return {
      name,
      email,
      password,
      addUser,
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
  },
};
</script>

<style>
</style>
