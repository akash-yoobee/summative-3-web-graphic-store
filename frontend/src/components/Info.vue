<template>
	<div class="info">
		<div class="info-indent">
			<h1 class="heading-info">Buy and sell digital art online!</h1>
			<h2 class="sub-heading-info">
				100% free e-commerce platform for artists! Sign up or log in to get
				started.
			</h2>
			<div class="buttons-info">
				<div class="buttons-logged-out" v-if="!login">
					<button class="button solid" @click="showLogIn">Log in</button>
					<button class="button inverse" @click="showSignUp">Sign up</button>
				</div>
				<div class="buttons-logged-in" v-if="login">
					<Btn-router
						value="List an item"
						:link="{
							name: 'profile',
							params: { user: userId, showCreate: true },
						}"
					></Btn-router>
					<BtnInverseRouter
						class="link"
						value="View Listings"
						:link="{ name: 'profile', params: { user: userId } }"
					></BtnInverseRouter>
				</div>
			</div>
		</div>
		<div class="stock-images">
			<img
				class="image-wide"
				src="https://images.pexels.com/photos/1012982/pexels-photo-1012982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			/>
			<img
				class="image-wide"
				src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
			/>
			<img
				class="image-wide"
				src="https://cdn.pixabay.com/photo/2018/04/06/13/46/poly-3295856_960_720.png"
			/>
		</div>
	</div>
</template>

<script>
	import Auth from "../services/auth-service"
	import { EventBus } from "../main"
	import BtnRouter from "../components/shared-components/BtnRouter"
	import BtnInverseRouter from "../components/shared-components/BtnInverseRouter"
	export default {
		props: ["value", "link"],
		name: "InfoSection",
		components: { BtnRouter, BtnInverseRouter },
		data() {
			return {
				login: false,
				modalLogIn: true,
				modalSignUp: true,
				userId: null,
			}
		},
		methods: {
			showLogIn() {
				var logInData = this.modalLogIn
				EventBus.$emit("login-value", logInData)
			},
			showSignUp() {
				var signUpData = this.modalSignUp
				EventBus.$emit("modal-value", signUpData)
			},
		},
		created: async function() {
			this.login = await Auth.isLoggedIn()
			this.login ? (this.userId = await Auth.getUserId()) : (this.userId = null)
		},
	}
</script>

<style lang="sass" scoped>
	@import "../lib/vars"

	.button
	  border-radius: 5px
	  box-shadow: 6px 6px 6px #C1C1C1
	  font-size: 0.9rem
	  text-decoration: none
	  text-align: center
	  height: 1.8rem
	  letter-spacing: 0.5px
	  width: 8rem
	  font-family: "Open Sans", sans serif
	  font-weight: 600
	  margin-top: 1rem
	  cursor: pointer
	  padding: 0px

	.solid
	  background-image: $buttonGradient
	  color: white
	  border: none

	.inverse
	  background-color: white
	  color: $mainRed
	  border: 2px $mainRed solid
	  margin-left: 2rem

	.buttons-logged-in
	  display: flex

	.info
	  display: block
	  position: relative
	  background: url('../../img/backdrop.png')

	.info-indent
	  margin-left: 9rem

	.heading-info
	  font-family: "Alegreya Sans", sans serif
	  font-weight: bold
	  font-size: 2.5rem
	  padding-top: 2rem
	  color: $mainRed
	  text-shadow: 0px 3px 6px #D6D6D6
	  margin: 0

	.sub-heading-info
	  font-family: "Open Sans", sans serif
	  font-size: 1.2rem

	.buttons-info
	  display: flex
	  margin-top: 0.5rem

	.stock-images
	  display: flex
	  align-items: top
	  margin: 0.5rem 0 0 9rem
	  padding-bottom: 3rem

	.image-wide
	  height: 10rem
	  margin: 2rem 1.5rem 0 0

	.image-long
	  height: 15rem
	  margin: 2rem 1.5rem 0 0
</style>
