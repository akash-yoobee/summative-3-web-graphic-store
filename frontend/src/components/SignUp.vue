<template>
  <div class="sign-up">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="modal" @click="modal = false"></div>
    </transition>
    <div class="modal-center" v-if="modal">
      <div class="modal-signup">
        <h1 class="heading">Sign up</h1>
        <form @submit="checkForm" class="login-form">
          <h2 class="sub-heading">Name</h2>
          <input v-model="user.name" type="text" name="name" />
          <h2 class="sub-heading">Username</h2>
          <input v-model="user.userName" type="text" name="userName" />
          <h2 class="sub-heading">Email address</h2>
          <input v-model="user.email" type="text" name="email" />
          <Btn class="button-modal" @click.native="createUser" value="Sign Up" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
import Btn from "../components/shared-components/Btn";
import axios from "axios";
import * as config from "../../config";
export default {
  components: { Btn },
  props: [""],
  name: "SignUp",
  data: function() {
    return {
      modal: false,
      user: {
        name: null,
        userName: null,
        email: null
      },
      botChecker: "",
      errors: []
    };
  },
  methods: {
    checkForm: function(evt) {
      evt.preventDefault();
      this.errors = [];
      if (this.botChecker) {
        this.errors.push("Not so fast mate!!!");
      }
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.errors.length) {
        this.loginUser();
      }
    },
    createUser: function() {
      return axios.post(`${config.apiUrl}/users`).then(function() {
        this.$router.push({ path: "/" });
      });
    }
  },
  created() {
    EventBus.$on("modal-value", signUpData => {
      this.modal = signUpData;
    });
  }
};
</script>

<style lang="sass" scoped>
@import "../lib/vars.sass"

.sign-up
  display: flex
  justify-content: center
  margin: 0rem !important

.modal-center
  position: absolute
  margin-top: 16rem
  z-index: 99
  .modal-signup
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
  margin-bottom: 1rem

.modal-overlay
  display: flex
  justify-content: center
  align-items: center
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

// event bus will send an event for everything to listen to