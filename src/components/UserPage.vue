<template>
  <div>
      <h3>My tweets</h3>
    <ul>
      <li v-for="tweet in tweets" :key="tweet">
        <div>
          <strong>{{ tweet.title }}</strong>
          <span>{{ tweet.creator }}</span>
        </div>
        <p class="text">{{ tweet.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch("getTweets");
  },

  computed: {
    tweets() {
      const tweets = this.$store.state.tweets;
      const userTweets = tweets.filter((tweet) => {
        if (tweet.creator === sessionStorage.getItem("email")) {
          return tweet;
        }
      });
      return userTweets.sort((a, b) => b.createdAt - a.createdAt);
    },
  },
};
</script>

<style lang="sass" scoped>
ul
  width: 30rem
  margin: auto
li
  list-style: none
  margin-bottom: 1rem
  div
    display: flex
    justify-content: space-between
    padding: 2rem
    background-color: LightGray
.text
  text-align: start
  padding: 2rem
  background-color: CadetBlue
  margin: 0
  color: white
</style>