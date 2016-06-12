<template>
	<div class='dashboard-holder container-fluid'>
		
	</div>
</template>

<script>
import { initComponent } from '../../vuex/action.js'
export default {
	vuex:{
      getters:{
      	
      },
      actions:{
       
      }
    },
	components: {
	
	},
	data() {
	  return {
	  	
	  }
	},
	methods: {
		
	},
	filters: {
		
	},
	route: {
		data() { this.initComponent('dashboard') }
	}
}
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.dashboard-holder {

}
</style>