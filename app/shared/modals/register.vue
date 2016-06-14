<template>
  <modal-holder modal-title='注 册' module='login' modal-property='showRegisterModal' modal-class='register-modal'>
    <div slot='modal-body' class='vn-modal-body'>
      <input type='text' placeholder='用户名' class='register-input' v-model='registerObj.username' />
      <input type='password' placeholder='密码' class='register-input' v-model='registerObj.password' />
      <input type='text' placeholder='识别码' class='register-input' v-model='registerObj.accessCode' />
      <button class='register-btn' @click='registerAction(registerObj)' :disabled='showLoading'>
        <div class="cssload-ball cssload-ball-small" v-if="showLoading"></div>
        提交
      </button>
    </div>
  </modal-holder>
</template>
<script>
import modalHolder from '../modalHolder.vue'
import { registerAction } from '../../vuex/action.js'

module.exports = {
  vuex: {
    getters: {
      showLoading: ({ register }) => register.showLoading
    },
    actions: {
      registerAction,
    }
  },
  components: {
    modalHolder,
  },
  data() {
    return {
      registerObj: {
        username: '',
        password: '',
        accessCode: '',
      },
    }
  }
};
</script>
<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';
.register-modal {
  @include modalDisplayTransition(.3s, 17rem, 19rem);
  .vn-modal {
    width: 38rem;
    margin-left: -19rem;
    background-color: $white;
  }
  .vn-modal-title {
    font-weight: bold;
    font-size: 2.2rem;
    color: $dark-coffee;
    padding: 1rem 0 1rem 1rem;
    display: inline-block;
  }
  .vn-modal-closer {
    margin-top: 1.2rem;
    margin-right: 0.2rem;
  }
  .vn-modal-body {
    padding: 1.5rem;
  }
  .register-btn {
    @extend %btn;
    background-color: $basic-blue;
    color: #fff;
    width: 100%;
    margin: 2rem 0 0 0;
  }
}

.register-input {
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  @include border-radius(4px);
}
</style>
