<template>
  <nav id="nav">
    <router-link v-if="!token" to="/login">Login</router-link>
    <router-link @click="logout" v-else to="/login">Logout</router-link> |
    <router-link to="/twitter">Twitter</router-link> |
    <router-link to="/post-tweet">Post Tweet</router-link> |
    <router-link v-if="token" to="/user-page">User Page</router-link>
  </nav>
  <router-view />
</template>
<script>
import { removeITem, getItem } from "./sessionStorage.js";
export default {
  data() {
    return {
      token: getItem("token"),
    };
  },
  methods: {
    logout() {
      removeITem("token");
      removeITem("email");
      removeITem("id");
      this.$router.go();
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px 0;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  width: 100%;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
