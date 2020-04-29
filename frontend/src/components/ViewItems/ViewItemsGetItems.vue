<template>
	<section class="item-list" v-if="showDetailed">
		<div v-for="item in items" :key="item.id" class="item-holder">
			<DetailedItem :itemData="item" :isLoggedIn="isLoggedIn" />
		</div>
	</section>

	<section class="item-grid" v-else-if="!userItems">
		<div v-for="item in items" :key="item.id" class="item-holder">
			<GridItem :itemData="item" />
		</div>
	</section>

	<section class="item-grid" v-else>
		<div v-for="item in items" :key="item.id" class="item-holder">
			<GridItem :itemData="item" />
		</div>
	</section>
</template>

<script>
	import axios from "axios"
	import config from "../../../config"
	import GridItem from "./ViewItemsGrid"
	import DetailedItem from "./ViewItemsDetailed"
	import GetIsLoggedIn from "../../services/auth-service"
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
		},
		created: async function() {
			if(this.userItems) {
				this.items = this.userItems
			} else {
				this.items =  await this.getItems()
			}
			this.isLoggedIn = GetIsLoggedIn.isLoggedIn()
		},
	}
</script>

<style lang="sass" scoped>
	@import "../../lib/vars"
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
		margin-top: 60px
</style>
