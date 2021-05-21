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
          type="submit"
        >Créer votre compte</button>
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
