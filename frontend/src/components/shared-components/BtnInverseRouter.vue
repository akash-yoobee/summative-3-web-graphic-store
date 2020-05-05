<template>
	<div class="btn-router">
		<router-link :to="link" class="btn-solid inverse">{{ value }}</router-link>
	</div>
</template>

<script>
	export default {
		props: ["value", "link"],
		name: "BtnInverseRouter",
		data() {
			return {}
		},
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"

	.btn-router
	  display: flex
	  .btn-solid
	    display: flex
	    align-items: center
	    justify-content: center
	    color: $mainRed
	    border: 2px $mainRed solid
	    box-shadow: 6px 6px 6px #C1C1C1
	    border-radius: 5px
	    font-size: 0.9rem
	    font-weight: 500
	    text-decoration: none
	    text-align: center
	    height: 1.8rem
	    letter-spacing: 1px
	    width: 8rem
	    font-family: "Open Sans", sans serif
	    font-weight: 600
	    border-radius: 5px
	    margin: 1rem 0 0 2rem
</style>
