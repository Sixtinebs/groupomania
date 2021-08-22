<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    active-text-color="#e94326"
  >
    <el-menu-item index="1">
      <router-link to="/"><img src="../assets/images/icon-left-font-monochrome-black.svg" /> </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/">Home </router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/profil">Mon Profil</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/editPost">Écrire un article</router-link>
    </el-menu-item>
    <el-menu-item class="disconnection"><a v-on:click="disconnection">Déconnexion</a></el-menu-item>

  </el-menu>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    disconnection: function () {
      this.$store.dispatch("disconnectUser", {
        userId: -1,
        token: "",
        user: {},
      });
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped>
ul,
ul li.el-menu-item {
  background-color: #f9d8d8;
  color: black;
}
.el-menu {
  margin: -10px;
}
ul img {
  width: 115px;
}

a {
  text-decoration: none;
}
.el-menu .disconnection {
  float: right;
}
</style>
