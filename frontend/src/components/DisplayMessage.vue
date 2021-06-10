<template>
  <el-scrollbar height="400px">
    <section>
      <div
        v-for="item in messages"
        :key="item.message"
        :class="[item.user_id == user.id ? myMessage :  notMyMessage]"
      >
        <!-- <el-col>
          <div class="block">
            <el-avatar
              shape="square"
              :size="50"
              :src="squareUrl"
            ></el-avatar>
          </div>
        </el-col> -->
        <div>
          <p class="user-name">{{ item.User.name }}</p>
          <p>{{ item.message }}</p>
          <el-button
            v-if="item.user_id == user.id"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            v-if="item.user_id == user.id"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteMessage(item.id, item)"
          ></el-button>
        </div>
      </div>
    </section>
  </el-scrollbar>
  <CreateMessage @newMessage="updateNewMessage" />

</template>

<script>
import messageService from "../service/messageService";
import { mapState } from "vuex";
import CreateMessage from "./CreateMessage.vue";
export default {
  components: {
    CreateMessage,
  },
  data() {
    return {
      messages: [],
      test: "",
      myMessage: "right",
      notMyMessage: "left",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    updateNewMessage(messages) {
      this.messages = messages;
    },
    getAllMessages() {
      messageService
        .getAll()
        .then((response) => {
          console.log("ici");
          this.messages = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteMessage(id, item) {
      console.log(id);
      messageService
        .deleteMessage(id)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      this.messages.splice(this.messages.indexOf(item), 1);
    },
  },

  created() {
    this.getAllMessages();
  },
};
</script>

<style scoped>
.right {
  text-align: end;
}
.left {
  text-align: start;
}
.user-name {
  font-weight: bold;
}
</style>