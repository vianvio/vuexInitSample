<template>
	<div class='upload-holder container-fluid'>
		<h6 class='required' v-show='bShowInstruction'>Required Fields</h6>
		<div class='col-xs-6'>
			<div class='form-group'>
				<label for='recordId'>Record Id</label>
				<input type='text' id='recordId' class='form-control' v-model='uploadForm.recordId' />
			</div>
			<div class='form-group'>
				<label for='type'>Type</label>
				<v-select class='form-select' id='type' :value.sync='uploadForm.type'>
					<v-option value='Type 1'>Type 1</v-option>
				</v-select>
			</div>
		</div>
		<div class='col-xs-6'>
			<input type='file' id='dataUploader' class='data-file-uploader' accept='*' @change='uploaderChange' />
			<button class='upload-btn' @click='upload()' v-show='uploadForm.file'>
				<div class="cssload-ball btn-loader" v-if="showLoading"></div>
				UPLOAD
	        </button>
			<hr v-show='uploadForm.file' />
			<div v-show='uploadForm.file'>
				<alert type="success" v-if='successMessage'>
				    {{successMessage}}
				</alert>
				<alert type="danger" v-if='errorMessage'>
				    {{errorMessage}}
				</alert>
				<div class='row file-name-info form-group'>
					<div class='col-xs-12 file-type-title'>
						Data File : 
				    </div>
				    <div class='col-xs-11 col-xs-offset-1'>
				    	{{ dataFileInfo.name }} - {{ dataFileInfo.size | formatSize}}
				    </div>
			    </div>
			    <div class='form-group'>Progress : </div>
			    <div class='progress-bar-holder'>
		        	<progressbar :now="percentage" label type="primary" striped animated></progressbar>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
import { updateUploadList, uploadFile } from '../../vuex/action.js'
import {select as vSelect, option as vOption, progressbar, alert} from 'vue-strap'

export default {
	vuex:{
      getters:{
      	percentage: ({ upload }) => upload.percentage,
      	showLoading: ({ upload }) => upload.showLoading, 
	    successMessage: ({ upload }) => upload.successMessage, 
	    errorMessage: ({ upload }) => upload.errorMessage, 
	    dataFileInfo: ({ upload }) => upload.dataFileInfo,
      },
      actions:{
        updateUploadList,
        uploadFile
      }
    },
	components: {
		vSelect,
		vOption,
		progressbar,
		alert
	},
	data() {
	  return {
	  	uploadForm: {
			recordId: '',
			type: '',
			file: ''
		},
		bShowInstruction: false
	  }
	},
	methods: {
		uploaderChange() {
			this.$data.uploadForm.file = true
			let dataFile = document.getElementById('dataUploader').files
			this.updateUploadList({
				datafile: {
					name: dataFile.length > 0 ? dataFile[0].name : '',
					size: dataFile.length > 0 ? dataFile[0].size : 0
				}
			})
		},
		upload(index){
			if (!this.$data.uploadForm.recordId || !this.$data.uploadForm.type) {
				this.$data.bShowInstruction = true;
			}else {
				this.$data.bShowInstruction = false;
				this.uploadFile({
					datafile: document.getElementById('dataUploader').files[0], 
				}, this.$data.uploadForm)
			}
		}
	},
	filters: {
		formatSize(size) {
			if (size > 1024 * 1024 * 1024) {
				return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
			} else if (size > 1024 * 1024) {
                return (size / (1024 * 1024)).toFixed(2) + ' MB';
            } else {
                return (size / 1024).toFixed(2) + ' KB';
            }
		}
	}
}
</script>

<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';

.upload-holder {
	padding: 1rem 5rem 0 5rem;
	.required {
		color: red;
	}

	.data-file-uploader {
		visibility: hidden;
		position: relative;
		height: 4rem;
		float: left;
		width: 15rem;
		margin-right: 1rem;
		&:after{
			content: 'Browse Data';
			@include blog-btn('false');
			background-color: $light-coffee;
			color: #fff;
			visibility: visible;
			top: 0;
			position: absolute;
			left: 0;
			width: 15rem;
			text-align: center;
			line-height: 4rem;
			cursor: pointer;
		}
	}

	.form-select{
		width: 100%;
		.btn {
			width: 100%;
			.caret {
			    position: absolute;
			    top: 1.6rem;
			    right: 1.5rem;
			}
		}
		.dropdown-menu {
			width: 100%;
		}
	}

	.file-type-title {
		color: $basic-blue;
	}

	.alert {
		word-break: break-all;
	}

	.file-name-info {
		line-height: 4rem;
	}
	
	.upload-btn {
		@include blog-btn('true');
		background-color: $basic-blue;
		color: #fff;
		position: relative;
	}

	.progress-bar-holder {
		border: 1px solid $shadow-dark;
		border-radius: 0.4rem;
		height: 2rem;
		overflow: hidden;
	}
}
</style>