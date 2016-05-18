<template>
	<div class='tree-list-holder container-fluid'>
		
	</div>
</template>

<script>

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
	  	uploadForm: {
			filename: '',
			location: '',
			delimeter: '',
			enclosure: '',
			metadata: '',
			file: ''
		},
		bShowInstruction: false
	  }
	},
	methods: {
		
	},
	filters: {
		
	}
}
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.tree-list-holder {

}
</style>