<template>

  <nav v-if="this.$store.state.userInfo.userId == -1">
    <h1>Groupomania</h1>
    <router-link to="/">Se connecter </router-link> |
    <router-link to="/register">Créer un compte </router-link>
  </nav>
  <Header v-else />
  <router-view />
</template>

<script>
import Header from "./views/Header";

export default {
  name: "App",
  components: { Header },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  font-weight: bold;
  text-decoration-line: underline;
}
</style>
