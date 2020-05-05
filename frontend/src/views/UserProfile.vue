<template>
	<div class="">
		<Navbar />
		<div class="profile-holder">

			<div class="about-holder">
				<div class="top">
					<img :src="info.photo" :alt="info.name" class="profile-image">
					<div class="left">
						<h1 class="name">{{info.name}}</h1>
						<span>{{info.email}}</span>
						<span></span>
					</div>
				</div>
				<div class="bio profile-item">
					<div class="title">Bio</div>
					<p class="content">{{info.bio}}</p>
				</div>
				<div class="contact profile-item">
					<div class="title">Contact Details</div>
					<p class="content">{{info.phone}}</p>
				</div>
				<div class="qualifications profile-item">
					<div class="title">Qualifications</div>
					<div class="item" v-for="item in info.qualifications" :key="item">
						<p>{{item}}</p>
					</div>
				</div>
				
				<Btn 
					:value="showCreate ? 'View Items' : 'List An Item' "
					v-on:click.native="showCreate = !showCreate"
				/>
			</div>

			<CreateItem v-if="showCreate" />
			<GetItems :userItems="true" showDetailed="true" v-else/>

		</div>
	</div>
</template>

<script>
	import Navbar from "../components/shared-components/Navbar"
	import GetItems from "../components/ViewItems/ViewItemsGetItems"
	import getUserDetails from "../services/get-user-details"
	import CreateItem from "../components/CreateItem/CreateItem"
	import Btn from "../components/shared-components/Btn"
	export default {
		name: "UserProfilePage",
		components: {GetItems, Navbar, CreateItem, Btn},
		deleteValue: false,
		data: function() {
			return {
				info: {},
				showCreate: false,
			}
		},
		created: async function() {
			this.showCreate = this.$route.params.showCreate
			this.info = await getUserDetails.getUser(this.$route.params.user)
		}
	}
</script>

<style lang="sass" scoped>
@import "../lib/vars.sass"
.profile-holder
	width: 100%
	display: flex
	background-color: $background
	margin: 0 auto
.about-holder
	margin: 50px 30px 0 50px
	background-color: $white
	box-shadow: 2px 2px 21px -7px rgba(0,0,0,0.30)
	border-radius: 5px
	height: max-content
	padding-bottom: 30px
	div
		padding: 30px 30px 0 30px
	p
		color: $fontBlack
	p, span
		font-family: $body
	.top
		display: flex
		border-bottom: 3px solid $mainRed
		margin: 30px
		padding: 0 0 30px 0
		.profile-image
			width: 100px
			height: 100px
			border-radius: 50%
		.left
			padding: 0 0 0 30px
			h1, span
				font-family: $heading
		.left > h1
			padding: 0
			margin-top: 0
	.title
		color: $mainRed
		font-family: $redHeading
		font-weight: 600
		padding: 0 30px 0 0
		font-size: 20px
	.profile-item
		max-width: 340px
	.qualifications
		.item
			padding: 0
</style>