<template>
  <form class="Register my-5" @submit.prevent="createPIN">
    <div class="input-group mb-5">
      <span class="input-group-text">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20C4 17 8 17 10 15C11 14 8 14 8 9C8 5.667 9.333 4 12 4C14.667 4 16 5.667 16 9C16 14 13 14 14 15C16 17 20 17 20 20" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <input type="text" class="form-control" :class="{'is-invalid': userNameValidity !== 'valid' && userNameValidity !== 'pending'}" v-model.trim="userName" @blur="validateUserName" placeholder="Enter your username">
      <p class="invalid-feedback m-0" v-if="userNameValidity === 'blank'">Username is required!</p>
      <p class="invalid-feedback m-0" v-if="userNameValidity === 'tooShort'">Minimum username is 8 characters!</p>
      <p class="invalid-feedback m-0" v-if="userNameValidity === 'containsEmptySpaces'">Empty spaces is not allowed!</p>
    </div>
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
      <button class="btn btn-primary" type="submit">Register</button>
    </div>
  </form>
  <p class="small text-muted text-center">Already have an account? Let’s <router-link to=/auth/login>Login</router-link></p>
</template>

<script>
import { mapMutations } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      userNameValidity: 'pending',
      email: '',
      emailValidity: 'pending',
      password: '',
      passwordValidity: 'pending'
    }
  },
  methods: {
    ...mapMutations(['updateRegister']),
    validateUserName () {
      if (this.userName === '') {
        return this.userNameValidity = 'blank'
      }
      if (this.userName.length < 8) {
        return this.userNameValidity = 'tooShort'
      }
      if (this.userName.includes(' ')) {
        return this.userNameValidity = 'containsEmptySpaces'
      }
      this.userNameValidity = 'valid'
    },
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
    createPIN () {
      if (this.userNameValidity !== 'valid' || this.emailValidity !== 'valid' || this.passwordValidity !== 'valid') {
        return swal.fire('Error', 'Fill the forms with a valid value!', 'error')
      }

      const data = {
        userName: this.userName,
        email: this.email,
        password: this.password
      }
      this.updateRegister(data)
      this.$router.push({ path: '/auth/create-pin' })
    }
  }
}
</script>

<style scoped lang="css">

</style>