<template>
  <h2>Ecrire un commentaire</h2>
  <form>
    <el-input
      type="textarea"
      placeholder="Votre commentaire"
      id="commment"
      name="comment"
      minlength="1"
      required
      v-model="comment"
      show-word-limit
    >
    </el-input>

    <el-button
      type="success"
      icon="el-icon-check"
      class="btn"
      @click="sendComment"
    ></el-button>
  </form>

</template>
<script>
import { ref } from "vue";
import commentService from "../service/commentService";
export default {
  setup() {
    return {
      comment: ref(""),
    };
  },
  emits: ["addComment"],
  methods: {
    sendComment() {
      const comment = {
        comment: this.comment,
        user_id: this.$store.state.userInfo.userId,
        message_id: this.$route.params.id,
      };
      const token = this.$store.state.userInfo.token;
      commentService
        .createComment(token, comment)
        .then(() => this.$emit("addComment"), (this.comment = ""))
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
</style>