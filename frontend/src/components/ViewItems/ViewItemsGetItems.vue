<template>
	<section class="no-items" v-if="items.length < 1">
		<p>This user has no items</p>
	</section>

	<section class="item-list" v-else-if="showDetailed">
		<div v-for="item in items" :key="item.id" class="item-holder">
			<DetailedItem :itemData="item" :isLoggedIn="isLoggedIn" v-on:deletedItem="updateItems($event)"/>
		</div>
	</section>

	<section class="item-grid" v-else>
		<div v-for="item in items" :key="item.id" class="item-holder">
			<GridItem :itemData="item" />
		</div>
	</section>
</template>

<script>
	import { EventBus } from "../../main"
	import axios from "axios"
	import config from "../../../config"
	import GridItem from "./ViewItemsGrid"
	import DetailedItem from "./ViewItemsDetailed"
	export default {
		name: "GetItems",
		components: {
			GridItem,
			DetailedItem,
		},
		// props may be used to pass in search data if we get to it
		props: ["userItems", "showDetailed"],
		data: function() {
			return {
				items: [],
				isLoggedIn: false,
			}
		},
		methods: {
			getItems: function() {
				return axios
					.get(`${config.apiUrl}/items`)
					.then((response) => {
						//handle success
						return response.data.items
					})
					.catch(function(error) {
						//handle error
						console.log(error)
					})
			},
			async checkUser() {
				let userId = localStorage.getItem("userId")
				if(userId && userId === this.$route.params.user) {	
					this.isLoggedIn = true
				} else {
					this.isLoggedIn = false
				}
			},
			getUsersItems: function() {
				console.log("ran get user items")
				return axios
					.get(`${config.apiUrl}/users/${this.$route.params.user}/items`)
					.then((response) => {
						//handle success
						return response.data.Item
					})
					.catch(function(error) {
						//handle error
						console.log(error)
					})
			},
			updateItems: function(deletedId) {
				let updatedItems = this.items.filter(function(item) {
					return item.id != deletedId
				})
				this.items = updatedItems
			}
		},

		created: async function() {
			this.userItems ? this.items = await this.getUsersItems() : this.items = await this.getItems()
			this.checkUser()

			EventBus.$on("login-event", () => {
				this.checkUser()
			})
		},
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"
	.no-items
		font-family: 'Open Sans', sans-serif
		color: $fontBlack
		margin: 0 auto
	.item-grid
		display: grid
		grid-template-columns: repeat(auto-fill, 200px)
		grid-column: span 4
		grid-column-gap: 20px
		grid-row-gap: 20px
		margin: 5rem auto
		padding: 0 5rem
		max-width: 90rem
		.item-holder 
			box-shadow: 2px 2px 9px -2px rgba(0,0,0,0.30)
	.item-list
		max-width: 90rem
		margin-top: 50px
</style>
