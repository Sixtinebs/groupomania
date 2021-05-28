<template>
  <section class="component-login">
    <h1>Connectez-vous !</h1>
    <form>
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
          @click="connectUser"
        >
          Se connecter
        </el-button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      password: ref(""),
      email: ref(""),
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
});
</script>

<style>
</style>