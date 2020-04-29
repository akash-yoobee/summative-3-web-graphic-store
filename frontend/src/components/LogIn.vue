<template>
  <div class="log-in">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="modal" @click="modal = false"></div>
    </transition>
    <div class="modal-center" v-if="modal">
      <div class="modal-login">
        <h1 class="heading">Welcome</h1>
        <form @submit="checkForm" class="login-form">
          <h2 class="sub-heading">Name</h2>
          <input type="text" name="name" />
          <h2 class="sub-heading">Username</h2>
          <input type="text" name="userName" />
          <Btn class="button-modal" @click:="loginUser" value="Log In"/>
        </form>
        <p class="sign-up">
          Don't have an account?
          <span class="bold-text">
            <a href>Sign up</a>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import GetIsLoggedIn from "../services/auth-service";
import { EventBus } from "../main";
import Btn from "../components/shared-components/Btn";
import axios from "axios";
import * as config from "../../config";
export default {
  components: { Btn },
  name: "Login",
  data: function() {
    return {
      modal: false,
      user: {
        email: ""
      },
      ohCrap: "",
      errors: []
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (this.ohCrap) {
        this.errors.push("Gotcha");
      }
      if (!this.user.email) {
        this.errors.push("Email Address required");
      }
      if (!this.errors.length) {
        this.loginUser();
      }
    },
    loginUser: function() {
      return axios
        .post(`${config.apiUrl}users/login`, this.user)
        .then(response => {
          let user = response.data.user;
          if (user) {
            localStorage.userEmail = user.email;
          } else {
            //show message
          }
          console.log("logged in for user", response.data.user);
          // handle success
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  created() {
    EventBus.$on("login-value", logInData => {
      this.modal = logInData;
    });
  }
};
</script>

<style lang="sass" scoped>
@import "../lib/vars.sass"

.log-in
  display: flex
  justify-content: center
  margin: 0rem !important

.modal-center
  position: absolute
  margin-top: 16rem
  z-index: 99
  .modal-login
    text-align: center
    background-color: $backgroundDark
    padding: 10px
    width: 15rem
    border: 2px solid $mainRed
    border-radius: 0.2rem

.heading
  margin: 1rem
  color: $mainRed
  font-family: $redHeading
  font-weight: bold
  font-size: 2rem

.sub-heading
  color: white
  font-family: $body
  font-weight: 300
  font-size: 0.8rem
  margin: 1rem 0 0.5rem 0

.sign-up
  color: white
  font-family: $body
  font-weight: 300
  font-size: 0.7rem
  letter-spacing: 0.3px
  margin: 1.5rem 0 1rem 0
  .bold-text
    font-weight: 600
    a
      color: $mainRed

.button-modal
  display: flex
  justify-content: center

.modal-overlay
  display: flex
  justify-content: center
  align-items: center
  height: 100%
  // overflow-x: visible
  // overflow-y: visible
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 98
  background-color: rgba(0, 0, 0, 0.3)

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
