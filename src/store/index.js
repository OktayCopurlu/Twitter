import { createStore } from "vuex";

const serverURL = "https://js-advanced-twitter.herokuapp.com";
const email = sessionStorage.getItem("email");
const id = sessionStorage.getItem("id");
export default createStore({
  state: {
    tweets: [],
    userEmail: email,
    userId: id,
  },
  mutations: {
    setUserInfo(state, { userEmail, token, userId }) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("id", userId);
    },
    setTweets(state, tweets) {
      return (state.tweets = tweets);
    },
    addTweet(state, tweet) {
      return state.tweets.push(tweet);
    },
  },
  actions: {
    login({ commit }, { userEmail, userPassword }) {
      return fetch(serverURL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const token = result.accessToken;
          const userId = result.user.id;
          const userEmail = result.user.email;
          const userObj = {
            userEmail,
            token,
            userId,
          };
          commit("setUserInfo", userObj);
        })
        .catch((error) => console.log("error", error));
    },
    register({ commit }, { userEmail, userPassword }) {
      return fetch(serverURL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const token = result.accessToken;
          const userId = result.user.id;
          const userEmail = result.user.email;

          const userObj = {
            userEmail,
            token,
            userId,
          };

          commit("setUserInfo", userObj);
        })

        .catch((error) => console.log("error", error));
    },
    postTweet({ commit }, { title, tweet, userId }) {
      fetch(serverURL + "/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          text: tweet,
          userId: userId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          commit("addTweet", result);
        })
        .then(() => {
          window.location.pathname = "/twitter";
        })
        .catch((error) => console.log("error", error));
    },
    getTweets({ commit }) {
      fetch(serverURL + "/tweets", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((tweets) => commit("setTweets", tweets))
        .catch((error) => console.log("error", error));
    },
  },
  getters: {
    tweets(state) {
      return state.tweets;
    },
    userId(state) {
      return state.userId;
    },
  },
});
