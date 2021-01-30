<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Profile row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <h2 class="fs-4 mb-5">Change PIN</h2>
      <form @submit.prevent="update" class="row justify-content-center">
        <div class="col-md-7">
          <p class="fs-6">Current Security PIN</p>
          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentFirstDigit" autofocus>
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentSecondDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentThirdDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentForthDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentFifthDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="currentSixthDigit">
              </div>
            </div>
          </div>

          <p class="fs-6 mt-3">New Security PIN</p>
          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="firstDigit" autofocus>
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="secondDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="thirdDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="forthDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="fifthDigit">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="sixthDigit">
              </div>
            </div>
          </div>

          <p class="fs-6 mt-3">Repeat New security PIN</p>
          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="firstDigitConfirmation" autofocus>
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="secondDigitConfirmation">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="thirdDigitConfirmation">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="forthDigitConfirmation">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="fifthDigitConfirmation">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <input type="password" class="form-control text-center" v-model="sixthDigitConfirmation">
              </div>
            </div>
          </div>
          <div class="d-grid mt-5">
            <button class="btn btn-primary" type="submit">
              Change PIN
            </button>
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
      currentFirstDigit: '',
      currentSecondDigit: '',
      currentThirdDigit: '',
      currentForthDigit: '',
      currentFifthDigit: '',
      currentSixthDigit: '',
      firstDigit: '',
      secondDigit: '',
      thirdDigit: '',
      forthDigit: '',
      fifthDigit: '',
      sixthDigit: '',
      firstDigitConfirmation: '',
      secondDigitConfirmation: '',
      thirdDigitConfirmation: '',
      forthDigitConfirmation: '',
      fifthDigitConfirmation: '',
      sixthDigitConfirmation: ''
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
    async update () {
      const currentSecurityPIN = this.currentFirstDigit + this.currentSecondDigit + this.currentThirdDigit + this.currentForthDigit + this.currentFifthDigit + this.currentSixthDigit
      const securityPIN = this.firstDigit + this.secondDigit + this.thirdDigit + this.forthDigit + this.fifthDigit + this.sixthDigit
      const securityPINConfirmation = this.firstDigitConfirmation + this.secondDigitConfirmation + this.thirdDigitConfirmation + this.forthDigitConfirmation + this.fifthDigitConfirmation + this.sixthDigitConfirmation

      if (securityPINConfirmation !== securityPIN) {
        this.firstDigitConfirmation = ''
        this.secondDigitConfirmation = ''
        this.thirdDigitConfirmation = ''
        this.forthDigitConfirmation = ''
        this.fifthDigitConfirmation = ''
        this.sixthDigitConfirmation = ''
        return swal.fire('Failed', 'New Security PIN not match!', 'error')
      }

      const formData = new FormData()
      formData.append('id', this.credentials.userId)
      formData.append('currentSecurityPIN', currentSecurityPIN)
      formData.append('securityPIN', securityPIN)

      try {
        const result = await this.updateProfile(formData)
        swal.fire(result.status, 'Security PIN changed!', 'success')
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

</style>