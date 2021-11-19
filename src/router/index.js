import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import PostTweet from "../components/PostTweet.vue";
import Twitter from "../components/Twitter.vue";
import Home from "../components/Home.vue";
import UserPage from "../components/UserPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/twitter",
    name: "Twitter",
    component: Twitter,
  },
  {
    path: "/post-tweet",
    name: "PostTweet",
    component: PostTweet,
  },{
    path: "/user-page",
    name: "UserPage",
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.fullPath === "/twitter" ||
    to.fullPath === "/post-tweet" ||
    to.fullPath === "/user-page"
  ) {
    if (!sessionStorage.getItem("token")) {
      next("/login");
    }
  }
  if (to.fullPath === "/login") {
    if (sessionStorage.getItem("token")) {
      next("/twitter");
    }
  }
  next();
});
export default router;
