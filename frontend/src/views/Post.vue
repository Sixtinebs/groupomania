<template>
  <h1>Mon article</h1>
  <h1>{{infoPost.title}}</h1>
  <div>
    <p>{{infoPost.message}}</p>
  </div>
</template>
<script>
import messageService from "../service/messageService";
export default {
  data() {
    return {
      infoPost: [],
    };
  },
  methods: {
    getMessage() {
      let token = this.$store.state.userInfo.token;
      let id = this.$route.params.id;
      console.log(id);
      messageService
        .getOneMessage(id, token)
        .then((response) => (this.infoPost = response.data.message))
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.getMessage();
  },
};
</script>
<style  scoped>
</style>