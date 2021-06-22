<template>
  <section>
    <h1>{{infoPost.title}}</h1>
    <div>
      <p>{{infoPost.message}}</p>
    </div>
  </section>
  <section class="comments">
    <h2>Les commentaires</h2>
    <div
      v-for="comment in infoPost.Comments"
      :key="comment"
      class="container-comment"
    >
      <p class="comment-name">{{comment.User.name}}</p>
      <p
        class="comment-commment"
        :id="'com-'+comment.id"
      >{{comment.comment}}</p>
      <!-- derniere modification ici ppur ajouter le nouveau commentaire modifié-->
      <!-- <p @currentComment="comment.comment">{{ currentComment}}</p> -->
      <div v-if="currentUser == comment.User.id">
        <UpdateComment
          :commentId="comment.id"
          @updateComment="changeComment"
        />
      </div>

    </div>
  </section>
  <CreateComment @addComment="getMessage" />

</template>
<script>
import messageService from "../service/messageService";
import CreateComment from "../components/CreateComment.vue";
import UpdateComment from "../components/UpdateComment.vue";
export default {
  data() {
    return {
      infoPost: [],
      currentUser: this.$store.state.userInfo.userId,
      currentComment: "",
    };
  },
  components: {
    CreateComment,
    UpdateComment,
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
    changeComment(comment, id) {
      let com = document.getElementById("com-" + id);
      com.innerHTML = comment;
    },
    addCurrentComment() {
      return this.currentComment;
    },
  },
  created() {
    this.getMessage();
    this.currentComment;
  },
};
</script>
<style  scoped>
.container-comment {
  text-align: left;
  padding: 20px;
  background: #5f9ea030;
  border-bottom: 1px solid #5f9ea0;
}
.comment-name {
  font-weight: bold;
}
</style>