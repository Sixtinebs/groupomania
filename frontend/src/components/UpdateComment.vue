<template>
  <div
    :id="commentId+'-texte-area'"
    :style="{display: isDisplay}"
  >
    <el-input
      class="modify-com"
      type="textarea"
      placeholder="Votre commentaire"
      name="comment"
      minlength="1"
      required
      v-model="comment"
      show-word-limit
    > </el-input>
    <el-button
      type="success"
      class="btn"
      icon="el-icon-check"
      @click="sendUpdateComment(token,commentId, {comment: comment})"
    ></el-button>
  </div>

  <el-button
    type="primary"
    class="btn"
    icon="el-icon-edit"
    circle
    @click="showHide()"
  ></el-button>
  <el-button
    type="danger"
    class="btn"
    icon="el-icon-delete"
    circle
    @click="deleteComment(token, commentId)"
  ></el-button>

</template>
<script>
import commentServie from "../service/commentService";
import { ref } from "vue";
import store from "../store/index";
export default {
  emits: ["updateComment", "deleteComment"],
  props: {
    commentId: Number,
  },
  setup() {
    return {
      token: store.state.userInfo.token,
      comment: ref(""),
      isDisplay: ref("none"),
    };
  },

  methods: {
    showHide() {
      if (this.isDisplay == "none") {
        this.isDisplay = "block";
      } else {
        this.isDisplay = "none";
      }
    },
    sendUpdateComment(token, id, comment) {
      commentServie
        .updateComment(token, id, comment)
        .then(() => {
          this.$emit("updateComment", comment.comment, id),
            (this.comment = ""),
            (this.isDisplay = "none");
        })
        .catch((error) => console.log(error));
    },
    deleteComment(token, id) {
      commentServie
        .deleteComment(token, id)
        .then(() => this.$emit("deleteComment", id))
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
</style>