<template>
  <h1>Groupomania</h1>
  <nav>
    <router-link to="/">Se connecter </router-link> |
    <router-link to="/register">Créer un compte </router-link>
  </nav>
  <router-view />
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {},
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
