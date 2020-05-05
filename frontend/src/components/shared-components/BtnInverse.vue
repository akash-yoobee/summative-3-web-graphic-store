<template>
	<div class="button">
		<button :type="type ? type : 'button'" class="button-solid">
			{{ value ? value : "Button" }}
		</button>
	</div>
</template>

<script>
	export default {
		props: ["type", "value"],
		name: "BtnInverse",
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"

	.button
	    display: flex
	    .button-solid
	        color: black
	        border: 2px $mainRed solid
	        border-radius: 5px
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
