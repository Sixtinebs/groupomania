<template>
  <h1>Mes informations</h1>
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
    ...mapState(["status", "user"]),
  },
};
</script>

<style>
</style>