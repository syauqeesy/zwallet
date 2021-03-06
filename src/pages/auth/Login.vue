<template>
  <form class="Login my-5" @submit.prevent="login">
    <div class="input-group mb-5">
      <span class="input-group-text">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 5H2V19H22V5Z" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6L12 13L21 6" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <input type="text" class="form-control" :class="{'is-invalid': emailValidity !== 'valid' && emailValidity !== 'pending'}" v-model.trim="email" @blur="validateEmail" placeholder="Enter your email">
      <p class="invalid-feedback m-0" v-if="emailValidity === 'blank'">Email is required!</p>
      <p class="invalid-feedback m-0" v-if="emailValidity === 'tooShort'">Email too short!</p>
      <p class="invalid-feedback m-0" v-if="emailValidity === 'invalidEmail'">Email is invalid!</p>
    </div>
    <div class="input-group mb-5">
      <span class="input-group-text">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 11H5V21H19V11Z" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
        </svg>
      </span>
      <input type="password" class="form-control" :class="{'is-invalid': passwordValidity !== 'valid' && passwordValidity !== 'pending'}" v-model.trim="password" @blur="validatePassword" placeholder="Enter your password">
      <p class="invalid-feedback m-0" v-if="passwordValidity === 'blank'">Password is required!</p>
      <p class="invalid-feedback m-0" v-if="passwordValidity === 'tooShort'">Password too short!</p>
    </div>
    <div class="d-grid">
      <button class="btn btn-primary" :class="{ disabled: isLoading }" type="submit">
        <span v-if="!isLoading">Login</span>
        <div class="loader" v-if="isLoading"></div>
      </button>
    </div>
  </form>
  <p class="small text-muted text-center">Don’t have an account? Let’s <router-link to=/auth/register>Register</router-link></p>
</template>

<script>
import swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      isLoading: false,
      email: '',
      emailValidity: 'pending',
      password: '',
      passwordValidity: 'pending'
    }
  },
  methods: {
    ...mapActions(['requestLogin']),
    validateEmail () {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.email === '') {
        return this.emailValidity = 'blank'
      }
      if (this.email.length < 8) {
        return this.emailValidity = 'tooShort'
      }
      if (!regex.test(this.email)) {
        return this.emailValidity = 'invalidEmail'
      }
      this.emailValidity = 'valid'
    },
    validatePassword () {
      if (this.password === '') {
        return this.passwordValidity = 'blank'
      }
      if (this.password.length < 8) {
        return this.passwordValidity = 'tooShort'
      }
      this.passwordValidity = 'valid'
    },
    async login () {
      if (this.emailValidity !== 'valid' || this.passwordValidity !== 'valid') {
        return swal.fire('Error', 'Fill the forms with a valid value!', 'error')
      }

      const data = {
        email: this.email,
        password: this.password
      }

      try {
        this.isLoading = true
        await this.requestLogin(data)
        this.isLoading = false
        this.$router.push({ path: '/home' })
      } catch (error) {
        swal.fire(error.status, error.message, 'error')
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="css">
.loader {
  margin: auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid rgba(255, 255, 255, .15);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>