<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Profile row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <h2 class="fs-4 mb-5">Change password</h2>
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-8 mb-3">
            <label for="currentPassword" class="form-label">Current password</label>
            <input type="password" class="form-control" id="currentPassword" :class="{'is-invalid': currentPasswordValidity !== 'valid' && currentPasswordValidity !== 'pending'}" v-model.trim="currentPassword" @blur="validateCurrentPassword" placeholder="Current password" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="currentPasswordValidity === 'blank'">Current password is required!</p>
            <p class="invalid-feedback m-0" v-if="currentPasswordValidity === 'tooShort'">Current password is too short!</p>
          </div>
          <div class="col-md-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" :class="{'is-invalid': passwordValidity !== 'valid' && passwordValidity !== 'pending'}" v-model.trim="password" @blur="validatePassword" placeholder="Password" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="passwordValidity === 'blank'">Password is required!</p>
            <p class="invalid-feedback m-0" v-if="passwordValidity === 'tooShort'">Password is too short!</p>
          </div>
          <div class="col-md-8 mb-3">
            <label for="passwordConfirmation" class="form-label">Password confirmation</label>
            <input type="password" class="form-control" id="passwordConfirmation" :class="{'is-invalid': passwordConfirmationValidity !== 'valid' && passwordConfirmationValidity !== 'pending'}" v-model.trim="passwordConfirmation" @blur="validatePasswordConfirmation" placeholder="Password confirmation" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="passwordConfirmationValidity === 'blank'">Password confirmation is required!</p>
            <p class="invalid-feedback m-0" v-if="passwordConfirmationValidity === 'tooShort'">Password confirmation is too short!</p>
            <p class="invalid-feedback m-0" v-if="passwordConfirmationValidity === 'notMatch'">Password confirmation is not match!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 d-grid mb-3">
            <button class="btn btn-primary" type="submit">Change password</button>
          </div>
        </div>
      </form>
    </main>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert2'
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Footer from '@/components/Footer'

export default {
  name: 'Profile',
  components: {
    Header,
    Aside,
    Footer
  },
  data () {
    return {
      isLoading: false,
      currentPassword: '',
      currentPasswordValidity: 'pending',
      password: '',
      passwordValidity: 'pending',
      passwordConfirmation: '',
      passwordConfirmationValidity: 'pending',
    }
  },
  computed: {
    ...mapGetters(['user', 'credentials'])
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
    }
  },
  methods: {
    ...mapActions(['getUser', 'updateProfile']),
    validateCurrentPassword () {
      if (this.currentPassword === '') {
        return this.currentPasswordValidity = 'blank'
      }
      if (this.currentPassword.length < 8) {
        return this.currentPasswordValidity = 'tooShort'
      }
      this.currentPasswordValidity = 'valid'
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
    validatePasswordConfirmation () {
      if (this.passwordConfirmation === '') {
        return this.passwordConfirmationValidity = 'blank'
      }
      if (this.passwordConfirmation.length < 8) {
        return this.passwordConfirmationValidity = 'tooShort'
      }
      if (this.passwordConfirmation !==  this.password) {
        return this.passwordConfirmationValidity = 'notMatch'
      }
      this.passwordConfirmationValidity = 'valid'
    },
    async update () {
      if (this.currentPasswordValidity !== 'valid' || this.passwordValidity !== 'valid' || this.passwordConfirmationValidity !== 'valid') {
        return swal.fire('Error', 'Fill the forms with a valid value!', 'error')
      }
      const formData = new FormData()
      formData.append('id', this.credentials.userId)
      formData.append('currentPassword', this.currentPassword)
      formData.append('password', this.password)

      try {
        this.isLoading = true
        const result = await this.updateProfile(formData)
        this.isLoading = false
        swal.fire(result.status, 'Password changed! please login again', 'success')
        this.logout()
      } catch (error) {
        this.isLoading = false
        if (error.message === 'Access denied') {
          localStorage.removeItem('userId')
          localStorage.removeItem('token')
          return this.$router.push('/auth/login')
        }
        swal.fire(error.status, error.message, 'error')
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push({ path: '/auth/login' })
    }
  }
}
</script>

<style scoped lang="css">
div.input-container {
  width: 20px;
  /* border: 1px solid blue; */
  position: relative;
  cursor: pointer;
  margin: auto;
}

div.input-container input {
  width: 100%;
  cursor: pointer;
  opacity: 0;
}

div.input-container svg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  z-index: -1;
}

.user {
  cursor: pointer;
}

.loader {
  margin: auto;
  border: 5px solid #858585;
  border-top: 5px solid rgba(255, 255, 255, .85);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>