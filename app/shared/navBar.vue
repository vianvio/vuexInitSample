<template>
	<div class='nav-holder'>
		<div class='info-holder'>
			数胎动
		</div>
		<nav class='nav'>
			<!-- <a v-link='' class='float-right nav-tab' v-bind:class='appModel.navBarModel.currentTab === "tab" ? "current-tab": ""'>Tab</a> -->
		</nav>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods:{
	},
	events:{
	},
	created() {
	}
};
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';

.nav-holder{
	background-color: $basic-blue;
	color: $white;
	height: $nav-height;
	border-bottom: 1px solid $shadow-dark;
	line-height: $nav-height;
	padding: 0 1.5rem;
}

.info-holder{ 
	text-align: center;
	float: left;
	font-size: 2.5rem;
}

.nav-tab {
	font-size: 16px;
	padding: 4rem 0.5rem 0.5rem 0.5rem;
	line-height: 20px;
	color: $shadow-dark;
	cursor: pointer;
	overflow: hidden;
	margin: 0 3rem;
	&:hover {
		color: $dark-blue;
		border-bottom: 2px solid $basic-blue;
	}
}

.nav .current-tab {
	/*background-color: $basic-blue;*/
	color: $dark-blue;
	border-bottom: 2px solid $basic-blue;
}

</style>