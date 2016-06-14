<template>
  <div v-if='show' transition='show-modal' v-bind:class='modalClass'>
    <div class='vn-modal-holder full-height' @click='close'>
      <div class='vn-modal' @click.stop>
        <slot name='modal-header'>
          <div class='vn-modal-header'>
            <span class='vn-modal-title'>{{modalTitle}}</span>
            <div class='fa fa-remove vn-modal-closer float-right' v-on:click='close'></div>
          </div>
        </slot>
        <slot name='modal-body'></slot>
        <slot name='modal-footer'>
          <div class='nv-modal-footer'>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { controlModal } from '../vuex/action.js'

module.exports = {
  name: 'modalHolder',
  data() {
    return {
      // show: false
    }
  },
  vuex: {
    actions: {
      controlModal,
    }
  },
  props: {
    modalTitle: String,
    modalClass: String,
    show: Boolean,
    module: String,
    modalProperty: String,
  },
  methods: {
    close: function() {
      this.controlModal(this.module, this.modalProperty, false)
    }
  },
  ready: function() {
    // this.show = true
  },
  transitions: {
    showModal: {
      afterLeave: function(el) {
        this.controlModal(this.module, this.modalProperty, false)
      }
    }
  }
};
</script>
<style lang='sass'>
@import '../variables.scss';
@import '../common.scss';
.vn-modal-holder {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.4;
    background-color: #000;
    width: 100%;
    height: 100%;
  }
}

.show-modal-transition {
  transition: all .6s ease;
}

.show-modal-leave {
  opacity: 0;
}

.vn-modal {
  position: absolute;
  width: 60rem;
  left: 50%;
  margin-left: -30rem;
  background-color: #fff;
  padding: 0.5rem 0;
  @include border-radius(4px);
  overflow: hidden;
}

.vn-modal-header {
  min-height: 3rem;
  font-size: 2rem;
  padding: 0 1rem;
  border-bottom: 1px solid $shadow-dark;
}

.vn-modal-closer {
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  &:hover {
    @include border-radius(50%);
    background-color: $shadow-dark;
  }
}
</style>
