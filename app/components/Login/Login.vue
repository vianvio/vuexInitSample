<template>
  <div class='login-holder'>
    <div class='login-label-holder'>
      <STRONG class='login-label'>LOGIN</STRONG>
    </div>
    <div class='login-input-holder position-relative'>
      <span class='fa fa-user login-input-icon'></span>
      <input type='text' class='login-input form-control' v-model='loginObj.username' placeholder='用户名' />
    </div>
    <div class='login-input-holder position-relative'>
      <span class='fa fa-lock login-input-icon'></span>
      <input type='password' class='login-input form-control' v-model='loginObj.password' placeholder='密码' @keyup.13='login' />
    </div>
    <button class='login-btn' @click='login'>
      <div class="cssload-ball cssload-ball-small" v-if="showLoading"></div>
      登录
    </button>
    <a class='register-link' @click='showRegisterModal'>注册</a>
  </div>
</template>
<script>
import {
  loginAction,
  setLoginFlag
} from '../../vuex/action.js'

export default {
  vuex: {
    getters: {
      showLoading: ({ login }) => login.showLoading
    },
    actions: {
      loginAction,
      setLoginFlag
    }
  },
  components: {},
  data() {
    return {
      loginObj: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.loginAction(this.loginObj)
    },
    showRegisterModal() {}
  },
  ready() {
    this.setLoginFlag(true)
  },
  route: {
    activate: function(transition) {
      sessionStorage.clear()
      transition.next()
    }
  }
}
</script>
<style lang='sass'>
@import '../../variables.scss';
@import '../../common.scss';
.login-holder {
  width: 40rem;
  min-height: 28rem;
  margin: 10rem auto;
  margin-bottom: 0;
  padding: 3rem 3rem 7rem 3rem;
  .login-btn {
    @extend %blog-btn;
    width: 100%;
    background-color: $basic-blue;
    color: #fff;
  }
  .register-link {
    color: $dark-coffee;
    text-align: center;
    margin-top: 1.5rem;
    display: block;
    font-size: 1.4rem;
    cursor: pointer;
  }
}

.login-label-holder {
  text-align: right;
  padding-right: 1rem;
  margin-bottom: 2rem;
}

.login-label {
  font-size: 30px;
  color: $dark-coffee;
}

.login-input-holder {
  height: 4rem;
  margin: 1rem 0 2rem 0;
  overflow: hidden;
}

.login-input-icon {
  position: absolute;
  line-height: 3rem;
  top: 0.5rem;
  width: 4rem;
  text-align: center;
  color: $shadow-dark;
  border-right: 1px solid $shadow-dark;
  font-size: 20px;
}

.login-input {
  height: 4rem;
  width: 100%;
  padding: 0 0 0 5rem;
  color: $font-dark;
}
</style>
