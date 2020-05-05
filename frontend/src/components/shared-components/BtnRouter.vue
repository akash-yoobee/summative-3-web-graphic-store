<template>
	<div class="btn">
		<router-link :to="link" class="btn-solid">{{ value }}</router-link>
	</div>
</template>

<script>
	export default {
		props: ["value", "link", "userDetails"],
		name: "BtnRouter",
		data() {
			return {}
		},
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"

	.btn
	  display: flex
	  margin: 0rem
	  .btn-solid
	    display: flex
	    align-items: center
	    justify-content: center
	    background-image: $buttonGradient
	    border-radius: 5px
	    color: white
	    box-shadow: 6px 6px 6px #C1C1C1
	    font-size: 0.9rem
	    font-weight: 500
	    text-decoration: none
	    text-align: center
	    height: 1.8rem
	    letter-spacing: 1px
	    width: 8rem
	    font-weight: 600
	    font-family: "Open Sans", sans serif
	    margin-top: 1rem
	    text-align: center
</style>
