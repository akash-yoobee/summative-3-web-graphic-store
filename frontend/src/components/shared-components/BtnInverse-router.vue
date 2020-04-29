<template>
  <div class="button">
<<<<<<< HEAD
    <router-link :to="{name: link}" class="button-solid">{{text}}</router-link>
=======
    <router-link :to="{name: link}" class="button-solid inverse">{{value}}</router-link>
>>>>>>> df31aa60d9c16fe11340a262834a1e3af3b97eed
  </div>
</template>

<script>
export default {
  props: ["text", "link"],
  name: "BtnInverseRouter",
  data() {
    return {
      value: ""
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../../lib/vars"

.button
    display: flex
    .button-solid
        color: black
        border: 2px $mainRed solid
        border-radius: 5px
        box-shadow: 6px 6px 6px #C1C1C1
        font-size: 0.9rem
        font-weight: 500
        text-decoration: none
        text-align: center
        height: 1.8rem
        letter-spacing: 1px
        width: 8rem
        font-family: "Open Sans", sans serif
        border-radius: 5px
        margin: 1.5rem 0 0 2rem
</style>