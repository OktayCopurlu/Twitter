<template>
<h3>Create a new Tweet</h3>
  <form @submit.prevent="formHandler">
    <input
      type="text"
      name="title"
      id="title"
      v-model="title"
      required
      maxlength="20"
      placeholder="title"
    />
    <textarea
      placeholder="tweet"
      name="tweet"
      id="tweet"
      required
      v-model="tweet"
      rows="6"
      maxlength="250"
    />
    <button
      :disabled="isDisabled"
      :class="[isDisabled ? '' : 'ready-button', 'button']"
    >
      Send
    </button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      tweet: "",
    };
  },
  computed: {
    isDisabled() {
      if (this.title && this.tweet) return false;
      else return true;
    },
    ...mapGetters(["userId"]),
  },
  methods: {
    formHandler() {
      const title = this.title;
      const tweet = this.tweet;
      const userId = this.userId;
      this.$store.dispatch("postTweet", { title, tweet, userId }).then(() => {
        this.title = "";
        this.tweet = "";
      });
    },
  },
};
</script>

<style lang="sass" scoped>
form
  display: flex
  flex-direction: column
  width: 30rem
  padding: 2rem
  box-shadow: (1px 1px 5px gray)
  border-radius: 8px
  margin: auto
  background-color: LightGray
  *
    padding: .5rem
    margin: 0.4rem
    outline: 0
    font-family: ("Times New Roman", Times, serif)
    font-size: 1.2rem
  .button
    background-color: gray
    color: white
    padding: .8rem
    border: 0
    cursor: pointer
  .ready-button
    background-color: green
</style>