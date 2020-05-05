<template>
	<div class="create-item-holder">
		<h2 class="create-item-title">List new item</h2>

		<div v-if="errors.length" class="error-holder">
			<span>Please correct the following error(s):</span>
			<ul>
				<li v-for="error in errors" :key="error">{{ error }}</li>
			</ul>
		</div>

		<div class="form-holder">
			<form @submit.prevent="checkForm">
				<div class="title wrapper">
					<label for="title">Title</label>
					<input type="text" v-model="itemData.name" />
				</div>
				<div class="description wrapper">
					<label for="description">Description</label>
					<textarea name="description" v-model="itemData.about" rows="8" />
				</div>

				<div class="price wrapper">
					<label for="price">Price</label>
					<input type="number" v-model="itemData.price" />
				</div>

				<div class="image wrapper">
					<label for="title">Image URL</label>
					<input type="text" v-model="itemData.image" />
				</div>

				<div class="submit-wrapper">
					<Btn value="Upload" type="submit" />
					<BtnInverse value="Cancel" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import config from "../../../config"
	import GetIsLoggedIn from "../../services/auth-service"

	import Btn from "../../components/shared-components/Btn"
	import BtnInverse from "../../components/shared-components/BtnInverse"

	export default {
		name: "CreateItem",
		components: {
			Btn,
			BtnInverse,
		},
		data: function() {
			return {
				itemData: {
					name: "",
					price: null,
					about: "",
					image: "",
					user: this.$route.params.user,
				},
				isLoggedIn: false,
				errors: [],
			}
		},
		methods: {
			checkForm: function(event) {
				event.preventDefault()
				this.errors = []

				if (!this.isLoggedIn) {
					this.errors.push("Please Log In")
				}
				if (!this.itemData.name) {
					this.errors.push("Item Title Required")
				}
				if (!this.itemData.about) {
					this.errors.push("Project Description Required")
				}
				if (!this.itemData.image) {
					this.errors.push("Item Image URL Required")
				}
				if (!this.errors.length) {
					this.createItem()
				}
			},
			createItem: function() {
				console.log("create item called")
				return axios
					.post(
						`${config.apiUrl}/users/${GetIsLoggedIn.getUserId()}/items`,
						this.itemData
					)
					.then(() => {
						// handle success
					})
					.catch(function(error) {
						// handle error
						console.log(error)
					})
			},
		},
		created: async function() {
			this.isLoggedIn = GetIsLoggedIn.isLoggedIn()
		},
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"
	.create-item-holder
		margin-top: 50px
		background-color: $white
		box-shadow: 2px 2px 21px -7px rgba(0,0,0,0.30)
		border-radius: 5px
		min-width: 340px
		height: max-content
		.create-item-title
			font-family: $redHeading
			color: $mainRed
			font-size: 20px
			margin-left: 30px
		.form-holder
			padding: 20px 30px 30px 30px
		.submit-wrapper
			display: flex
			justify-content: center
		.wrapper
			margin-bottom: 30px
			input, textarea
				border-radius: 5px
				background-color: $background
				border: 0
				display: block
				width: 100%
				padding: 10px
				box-sizing: border-box
			label
				margin-bottom: 5px
				display: block
				font-family: 'Open Sans', sans-serif
				color: $fontBlack
		.error-holder
			padding: 30px
			span, li
				font-family: 'Open Sans', sans-serif
</style>
