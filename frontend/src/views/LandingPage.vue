<template>
	<div class="view">
		<Navbar />
		<InfoSection />
		<GetItems :showDetailed="false" />
	</div>
</template>

<script>
	import GetItems from "../components/ViewItems/ViewItemsGetItems"
	import Navbar from "../components/shared-components/Navbar"
	import InfoSection from "../components/Info"
	export default {
		name: "LandingPage",
		components: { GetItems, Navbar, InfoSection },
	}
</script>

<style lang="sass" scoped></style>
