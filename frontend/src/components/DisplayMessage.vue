<template>
  <el-scrollbar height="400px">
    <section>
      <div
        v-for="item in messages"
        :key="item.message"
        :class="[item.user_id == user.id ? myMessage :  notMyMessage]"
      >
        <div>
          <p class="user-name">{{ item.User.name }}</p>
          <p
            class="message-user"
            :id="'id-'+item.id"
          >{{ item.message }}</p>
          <UpdateMessage
            class="input-update-message"
            v-bind:style="{display:computedDisplay}"
            v-if="currentUpdateMessage == item.id"
            :messageId="currentUpdateMessage"
            @update-message="modifyOneMessage"
          />
          <el-button
            v-if="item.user_id == user.id"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="updateMessage(item.id)"
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
  <CreateMessage @reload-message="getAllMessages" />

</template>

<script>
import messageService from "../service/messageService";
import { mapState } from "vuex";
import CreateMessage from "./CreateMessage.vue";
import UpdateMessage from "./UpdateMessage.vue";
export default {
  components: {
    CreateMessage,
    UpdateMessage,
  },
  data() {
    return {
      messages: [],
      test: "",
      myMessage: "right",
      notMyMessage: "left",
      display: "none",
      currentUpdateMessage: null,
    };
  },
  computed: {
    ...mapState(["user"]),
    //return data css display
    computedDisplay: function () {
      return this.display;
    },
  },
  methods: {
    // Update when create a new message
    // updateNewMessage(messages) {
    //   this.messages = messages;
    // },
    //update when edit a message
    modifyOneMessage(message) {
      console.log("message", message);
      let messageId = document.getElementById(
        "id-" + this.currentUpdateMessage
      );
      messageId.innerHTML = message;
    },
    getAllMessages() {
      console.log("je suis la");
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
    updateMessage(id) {
      // Find a good message for update
      for (const item of this.messages) {
        if (item.id == id) {
          //Change variable
          this.currentUpdateMessage = id;
          //Hide or show input
          if (this.display == "none") {
            this.display = "inline-block";
          } else {
            this.display = "none";
          }
        }
      }
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
.input-update-message {
  display: none;
}
</style>