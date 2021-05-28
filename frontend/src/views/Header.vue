<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">Mon profil</el-menu-item>

    <el-menu-item index="3"><a v-on:click="disconnection">Déconnexion</a></el-menu-item>

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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    disconnection: function () {
      this.$store.dispatch("disconnectUser", {
        userId: -1,
        token: "",
      });
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped>
.el-menu {
  margin-top: -60px;
}
</style>
