<template>
  <div>
    <form class="form-update-message">
      <el-input
        placeholder="Entrez quelque chose"
        v-model="inputMessage"
      ></el-input>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
        @click="sendUpdateMessage(messageId, inputMessage)"
      ></el-button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import messageService from "../service/messageService";
export default defineComponent({
  emits: ["updateMessage"],
  setup() {
    return {
      inputMessage: ref(""),
    };
  },
  props: {
    messageId: Number,
  },
  methods: {
    sendUpdateMessage: function (id, message) {
      let token = this.$store.state.userInfo.token;
      messageService
        .updateMessage(id, message, token)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      this.$emit("updateMessage", message);
    },
  },
});
</script>

<style scoped>
.form-update-message {
  display: flex;
}
</style>