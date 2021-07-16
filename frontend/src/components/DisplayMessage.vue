<template>
  <el-scrollbar height="500px">
    <section class="container-post">
      <div
        v-for="item in messages"
        :key="item.message"
      >
        <div class="post">
          <router-link
            :to="{ name: 'Post', params: { id: item.id }}"
            class="message-user"
            :id="'id-'+item.id"
          >{{item.title}}</router-link>
          <p class="user-name">{{ item.User.name }}</p>

          <update-message
            v-if="currentUpdateMessage == item.id"
            @update-message="getAllMessages"
          />
          <el-button
            v-if="item.user_id == user.userProfil.id || user.userProfil.isAdmin"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="updateMessage(item.id)"
          ></el-button>
          <el-button
            v-if="item.user_id == user.userProfil.id || user.userProfil.isAdmin"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteMessage(item.id, item)"
          ></el-button>
        </div>
      </div>
    </section>
  </el-scrollbar>

</template>

<script>
import messageService from "../service/messageService";
import { mapState } from "vuex";
import UpdateMessage from "./UpdateMessage.vue";
export default {
  components: {
    UpdateMessage,
  },
  data() {
    return {
      messages: [],
      display: "none",
      currentUpdateMessage: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getAllMessages() {
      let token = this.$store.state.userInfo.token;
      messageService
        .getAll(token)
        .then((response) => {
          this.messages = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMessage(id) {
      // Find a good message for update
      for (const item of this.messages) {
        if (item.id == id) {
          //Change variable
          this.currentUpdateMessage = id;
          this.$router.push({
            name: "ModifyPost",
            params: { id: this.currentUpdateMessage },
          });
        }
      }
    },
    deleteMessage(id, item) {
      let token = this.$store.state.userInfo.token;
      messageService
        .deleteMessage(id, token)
        .then((response) => response.status)
        .catch((error) => console.log(error));
      this.messages.splice(this.messages.indexOf(item), 1);
    },
  },
  watch() {
    this.getAllMessages();
  },
  created() {
    this.getAllMessages();
  },
};
</script>

<style scoped>
.user-name {
  font-weight: bold;
}
.container-post {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.container-post div {
  width: 50%;
  height: 120px;
  margin-bottom: 50px;
}
.post {
  margin: auto;
  padding: 20px;
  border: 2px solid rgb(84, 92, 100);
  background-color: rgb(84 92 100 / 5%);
  border-radius: 15px;
}
@media screen and (max-width: 650px) {
  .container-post div {
    width: 80%;
  }
}
</style>