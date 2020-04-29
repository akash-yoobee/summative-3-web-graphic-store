<template>
    <div class="button">
        <button :type="type ? type : 'button'" class="button-solid">{{value ? value : 'Button'}}</button>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: ["type", "value"]
}
</script>

<style lang="sass" scoped>
@import "../../lib/vars"

.button
    display: flex
    .button-solid
        background-color: $mainRed
        border: 2px $mainRed solid
        border-radius: 5px
        color: white
        box-shadow: 6px 6px 6px #C1C1C1
        font-size: 0.9rem
        text-decoration: none
        text-align: center
        height: 1.8rem
        letter-spacing: 1px
        width: 8rem
        font-family: "Open Sans", sans serif
        font-weight: 600
        margin-top: 1.5rem
</style>