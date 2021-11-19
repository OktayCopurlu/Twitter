<template>
  <form v-if="!token" @submit.prevent="formHandler">
    <input
      type="email"
      name="email"
      id="email"
      v-model="userEmail"
      required
      placeholder="email"
    />
    <input
      required
      type="password"
      name="password"
      id="password"
      placeholder="password"
      v-model="userPassword"
    />
    <button
      :disabled="isDisabled"
      :class="[isDisabled ? '' : 'ready-button', 'button']"
      v-if="haveAccount"
    >
      Login
    </button>
    <button
      :disabled="isDisabled"
      :class="[isDisabled ? '' : 'ready-button', 'button']"
      v-else
    >
      Register
    </button>
    <a v-if="haveAccount" href="#" @click="register">Create new account</a>
    <a v-else href="#" @click="login">Login</a>
  </form>
  <div v-else>
    <h2>Welcome {{ user }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      haveAccount: true,
    };
  },
  computed: {
    isDisabled() {
      if (this.userEmail && this.userPassword) return false;
      else return true;
    },
    token() {
      return sessionStorage.getItem("token");
    },
    user() {
      return this.$store.state.userEmail;
    },
  },
  methods: {
    register() {
      this.haveAccount = false;
    },
    login() {
      this.haveAccount = true;
    },
    formHandler() {
      const userEmail = this.userEmail;
      const userPassword = this.userPassword;
      if (this.haveAccount) {
        this.$store
          .dispatch("login", { userEmail, userPassword })
          .then(() => this.$router.go())
      } else {
        this.$store
          .dispatch("register", { userEmail, userPassword })
          .then(() => this.$router.go());
      }
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