<template>
  <section
    class="form-connect"
    v-if="this.$store.state.userInfo.userId == -1"
  >
    <nav>
      <div id="name-app">
        <img src="./assets/images/icon-left-font-monochrome-white.svg" />
      </div>
      <div id="link-nav">
        <router-link to="/">Se connecter </router-link><span>|</span>
        <router-link to="/register">Créer un compte </router-link>
      </div>

    </nav>
    <router-view />
  </section>
  <section v-else>
    <Header />
    <router-view />
  </section>

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
}

nav a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  font-weight: bold;
  text-decoration-line: underline;
}
.form-connect nav {
  background-color: #e94326;
  color: black;
  border-radius: 20px 0 0 20px;
  padding: 20px;
}
.form-connect {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 450px;
}
.form-connect .view-login {
  background-color: #f9d8d8;
  border-radius: 0 20px 20px 0;
  padding: 20px;
}
.form-connect img {
  width: 150px;
  margin-top: 18px;
}
.el-input,
.el-textarea {
  margin: 10px 0;
}
.form-connect .el-button {
  background-color: white;
  color: #e94326;
  border: 1px solid#e94326;
  transition: 25ms;
  margin-top: 25px;
}
.el-button--primary.is-disabled,
.el-button--primary.is-disabled:active,
.el-button--primary.is-disabled:focus,
.el-button--primary.is-disabled:hover {
  background-color: #e9432673 !important;
  border: 1px solid #e9432673 !important;
}
.form-connect .el-button:hover {
  background-color: transparent;
  color: #e94326;
  border: 1px solid #e94326;
  color: white;
}
#link-nav {
  display: flex;
  flex-direction: column;
  padding-top: 40px;
}
.btn.el-button--primary:hover {
  background-color: transparent;
  border: 1px solid #4326e9;
  color: black;
}
.btn.el-button--primary {
  background-color: #4326e9;
  border: 1px solid #4326e9;
  color: white;
}
.btn.el-button--danger {
  background-color: #e94326;
  border: 1px solid #e94326;
  color: white;
}
.btn.el-button--danger:hover {
  background-color: transparent;
  border: 1px solid #e94326;
  color: black;
}
.btn.el-button--succes {
  background-color: #26e943;
}
.btn.el-input {
  margin: 10px 0;
}
@media screen and (max-width: 440px) {
  .form-connect {
    display: block;
    height: initial;
    position: initial;
    min-width: 200px;
    transform: initial;
  }
  .form-connect nav {
    border-radius: 20px 20px 0 0;
  }
  .form-connect .view-login {
    border-radius: 0 0 20px 20px;
  }
}
</style>
