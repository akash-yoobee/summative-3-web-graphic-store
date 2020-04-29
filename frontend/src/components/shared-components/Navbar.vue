<template>
  <div class="header">
    <img class="logo" src="../../../img/artmarket.svg" alt="ARTmarket" />
    <div class="nav-links">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" :to="{
        name: 'profile', 
        params: { user: userDetails.id, showCreate: true },
      }">List an item</router-link>
      <font-awesome-icon class="fa-lg" :icon="['fas', 'bell']" />
      <!-- SIGN IN OR PROFILE, DEPENDING ON LOGGED IN STATUS -->
      <router-link v-if="login" :to="{ 
        name: 'profile', 
        params: { user: userDetails.id },
      }">{{userDetails.name}}</router-link>
    </div>
  </div>
</template>

<script>
import GetIsLoggedIn from "../../services/auth-service"
import UserDetails from "../../services/get-user-details"
export default {
  props: [],
  name: "Navbar",
  data() {
    return {
      login: true,
      userDetails: {}
    }
  },
  created: async function() {
    this.login = await GetIsLoggedIn.isLoggedIn()
    this.userDetails = await UserDetails.getUser("5e9eedead3f3ec672829ec4e")
  }
}

</script>

<style lang="sass" scoped>
@import "../../lib/vars"

.header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1.5rem 3rem
  background-color: #1A1A1A
  color: white

.fa-lg
  margin-left: 2rem

.fa-lg:hover
  color: $mainRed

.nav-links
  display: flex
  justify-content: flex-end
  padding: 0
  .link
    display: flex
    text-align: right
    margin: 0rem 0rem 0rem 2rem
    list-style-type: none
    font-family: "Poppins", sans-serif
    color: white
    text-decoration: none
  .link:hover
    color: $mainRed

.logo
  height: 2rem
</style>