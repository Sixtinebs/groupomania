<template>
  <h1>Mon profil </h1>
  <h2>Mes informations</h2>
  <p>Prénom : {{ user.userProfil.name}}</p>
  <p>Email : {{user.userProfil.email}}</p>
  <update-profil />

</template>

<script>
import { mapState } from "vuex";
import UpdateProfil from "../components/UpdateProfil.vue";
export default {
  components: { UpdateProfil },
  computed: {
    ...mapState(["status", "user", "userInfo"]),
  },
};
</script>

<style>
</style>