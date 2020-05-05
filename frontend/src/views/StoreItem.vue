<template>
	<div id="app">
		<div class="shell">
			<Navbar></Navbar>
			<div class="container">
				<div class="item-details">
					<img class="item-image" v-bind:src="artImage" :alt="artAltText" />
					<div class="item-about">
						<div class="name">{{ artDetails.name }}</div>
						<div class="price">${{ artPrice }}</div>
						<div>{{ artDetails.about }}</div>
						<br />
						<button class="button">Buy now</button>
					</div>
				</div>
				<div class="user-details">
					<div class="name">About the seller</div>
					<div class="profile">
						<img
							class="user-image"
							v-bind:src="profileImage"
							:alt="artistAltText"
						/>
						<div class="user-info">
							<div class="user-name">{{ artistDetails.name }}</div>
							<div>Member since: {{ artistDetails.memberSince }}</div>
						</div>
					</div>
					<ul class="qual">
						<li
							v-for="(qualification, index) in artistQualifications"
							:key="index"
						>
							{{ qualification }}
						</li>
					</ul>
					<br />
					<div class="contact">Phone: {{ artistDetails.phone }}</div>
					<div class="contact">Email: {{ artistDetails.email }}</div>
					<br />
					<button class="button" @click="viewListings">View listings</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from "../components/shared-components/Navbar"
	export default {
		name: "StoreItem",
		components: { Navbar },
		data() {
			return {
				artDetails: [],
				artistDetails: [],
				artistQualifications: [],
				artAltText: "picture of an electronic artwork",
				artistAltText: "picture of a digital artist",
			}
		},
		methods: {
			getItemDetails(searchTerm) {
				let query = `http://localhost:3000/api/v1/items/${searchTerm}`
				fetch(query)
					.then((response) => response.json())
					.then((json) => {
						this.artDetails = {
							image: json.item.image,
							name: json.item.name,
							price: json.item.price,
							about: json.item.about,
							userId: json.item.user,
						}
						this.getArtistDetails(this.artDetails.userId)
					})
			},
			getArtistDetails(searchTerm) {
				let query = `http://localhost:3000/api/v1/users/${searchTerm}`
				fetch(query)
					.then((response) => response.json())
					.then((json) => {
						this.artistDetails = {
							image: json.photo,
							name: json.name,
							memberSince: json.memberSince,
							qualifications: json.qualifications,
							phone: json.phone,
							email: json.email,
						}
						this.artistQualifications = this.artistDetails.qualifications
					})
			},
			viewListings() {
				this.$router.push({ path: `/profile/${this.artDetails.userId}` })
			},
		},
		computed: {
			artImage() {
				return this.artDetails.image
			},
			profileImage() {
				return this.artistDetails.image
			},
			artPrice() {
				let price = this.artDetails.price
				let formattedPrice = parseInt(price).toFixed(2)
				return formattedPrice
			},
		},
		created: function() {
			this.getItemDetails(this.$route.params.itemId)
		},
	}
</script>

<style scoped lang="sass">
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')

	.shell
		display: flex
		flex-direction: column
	.container
		display: flex
		flex-direction: row
		background-color: #ebebeb
		font-family: 'Poppins', sans-serif
	.item-details
		display: flex
		flex-direction: row
		background-color: #ffffff
		margin: 4em 2.5em 4em 4em
		padding: 2em
		width: 65%
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
	.item-image
		padding: 1.5em 2.5em 1.5em 1.5em
	.name
		font-family: 'Poppins', sans-serif
		text-align: left
		font-size: 1.7em
		font-weight: bold
	.item-about
		display: flex
		flex-direction: column
		justify-content: space-between
		background-color: #ffffff
		padding: 1.2em 2em 1.2em 2.5em
	.price
		color: #FF0000
		font-weight: 600
	.button
		background-color: #dd1260
		border: none
		color: white
		padding: 0.7em
		border-radius: 4px
		text-align: center
		text-decoration: none
		font-size: 1em
		font-weight: bold
		display: inline-block
		width: 10em
		cursor: pointer
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
		-webkit-transition-duration: 0.4s
		transition-duration: 0.4s
	.button:hover
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)
	.user-details
		display: flex
		flex-direction: column
		justify-content: space-between
		background-color: #ffffff
		margin: 4em 4em 4em 2.5em
		padding: 3.2em
		width: 22%
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
	.profile
		display: flex
		flex-direction: row
		padding: 1em 0em 1em 0em
	.user-image
		height: 80%
		border-radius: 50%
	.user-info
		display: flex
		flex-direction: column
		padding: 0em 0em 0em 1em
	.user-name
		font-size: 1.2em
		font-weight: bold
		padding: 0.8em 0em 0.5em 0em
	.qual
		list-style-type: none
	.contact
		color: #dd1260
		font-weight: 600
</style>
