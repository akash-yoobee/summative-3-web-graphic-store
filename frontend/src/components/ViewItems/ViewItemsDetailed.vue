<template>
  <router-link class="item-detailed" :to="{name: 'item', params: {itemId: itemData.id}}">
    <div class="left">
      <img :src="itemData.image" :alt="itemData.title" />
    </div>
    <div class="right">
      <h1>{{itemData.name}}</h1>
      <span>${{itemData.price}}</span>
      <p class="description">{{itemData.about}}</p>
      <div class="admin-buttons" v-if="isLoggedIn">
        <font-awesome-icon icon="pen" class="admin-icon" />
        <font-awesome-icon icon="trash" class="admin-icon" @click.prevent="deleteItem(itemData.id)" />
      </div>
    </div>
  </router-link>
</template>

<script>

import config from "../../../config"
import axios from "axios"
export default {
  name: "GridItem",
  props: ["itemData", "isLoggedIn"],
  methods: {
    deleteItem: function(itemId) {
      this.$emit("deletedItem", this.itemData.id)
      return axios
        .delete(`${config.apiUrl}/items/${itemId}`)
        .then(async () => {
          // handle success
          this.$emit("deletedItem", this.itemData.id)
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../lib/vars"
$imageHeight: 180px
.item-detailed
  background-color: white
  box-shadow: 2px 2px 9px -2px rgba(0,0,0,0.30)
  display: flex
  max-width: 50rem
  margin-bottom: 20px
  border-radius: 5px
  text-decoration: none
  .left
    img
      object-fit: cover
      width: $imageHeight
      height: $imageHeight
      border-radius: 5px 0 0 5px
  .right
    width: 100%
    *
      margin: 15px 30px
      font-family: 'Open Sans', sans-serif
    h1
      font-weght: bold
      font-size: 20px
      color: $fontBlack
    span
      color: $mainRed
      font-size: 20px
    .description
      font-weght: 100
      color: $fontBlack
  .admin-buttons
    width: 30px
    margin: 0
    margin-top: -30px
    float: right
    *
      margin: 5px
      color: $fontBlack
</style>