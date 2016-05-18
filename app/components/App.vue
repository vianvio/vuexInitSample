<template>
	<!-- <div class='page-loading' v-show='appModel.bLoading'>
        <div class='cssload-ball'></div>
    </div> -->
	<navbar></navbar>
	<div class='content-holder'>
		<router-view></router-view>
	</div>
</template>

<script>

import navbar from '../shared/navbar.vue'
import store from '../vuex/store.js'

export default {
	store,
	components: {
		navbar
	},
	data() {
		return {
		}
	},
	events: {
	},
	replace: false
}
</script>

<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';
@import '../index.scss';
@import '../../node_modules/bootstrap/dist/css/bootstrap.css';

.content-holder {
	margin-top: 1rem;
}

</style>