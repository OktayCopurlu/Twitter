import { createStore } from "vuex";
import { setItem, getItem } from "../sessionStorage.js";

const serverURL = "https://js-advanced-twitter.herokuapp.com";

export default createStore({
  state: {
    tweets: [],
    userEmail: getItem("email"),
    userId: getItem("id"),
    token: getItem("token"),
  },
  mutations: {
    setUserInfo(state, { userEmail, token, userId }) {
      setItem("token", token);
      setItem("email", userEmail);
      setItem("id", userId);
    },
    setTweets(state, tweets) {
      state.tweets = tweets;
      return state.tweets;
    },
    addTweet(state, tweet) {
      state.tweets.push(tweet);
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
    postTweet({ commit, state }, { title, tweet }) {
      fetch(serverURL + "/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          text: tweet,
          userId: state.userId,
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
    getTweets({ commit, state }) {
      fetch(serverURL + "/tweets", {
        headers: {
          Authorization: "Bearer " + state.token,
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
  },
});
