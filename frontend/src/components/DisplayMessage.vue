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
        </div>
      </div>
    </section>
  </el-scrollbar>
  <div>{{ myTest() }}</div>
</template>

<script>
import messageService from "../service/messageService";
import { mapState } from "vuex";
export default {
  props: {
    unTest: String,
  },
  data() {
    return {
      messages: [],
      test: [],
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
    myTest() {
      this.test = this.unTest;
      return this.test;
    },
    getAllMessages() {
      messageService
        .getAll()
        .then((response) => {
          this.messages = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
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