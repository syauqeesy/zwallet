<template>
  <form class="my-5" @submit.prevent="register">
    <p class="fs-6">Security PIN</p>
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

    <p class="fs-6 mt-5">Repeat security PIN</p>
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
      <button class="btn btn-primary" :class="{ disabled: isLoading }" type="submit">
        <span v-if="!isLoading">Confirm</span>
        <div class="loader" v-if="isLoading"></div>
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert2'
export default {
  name: 'CreatePIN',
  data () {
    return {
      isLoading: false,
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
    ...mapGetters(['registerData'])
  },
  mounted () {
    if (this.registerData.userName === '' || this.registerData.email === '' || this.registerData.password === '') {
      this.$router.push({ path: '/auth/register' })
    }
  },
  methods: {
    ...mapActions(['requestRegister']),
    async register () {
      const securityPIN = this.firstDigit + this.secondDigit + this.thirdDigit + this.forthDigit + this.fifthDigit + this.sixthDigit
      const securityPINConfirmation = this.firstDigitConfirmation + this.secondDigitConfirmation + this.thirdDigitConfirmation + this.forthDigitConfirmation + this.fifthDigitConfirmation + this.sixthDigitConfirmation

      if (securityPINConfirmation !== securityPIN) {
        this.firstDigitConfirmation = ''
        this.secondDigitConfirmation = ''
        this.thirdDigitConfirmation = ''
        this.forthDigitConfirmation = ''
        this.fifthDigitConfirmation = ''
        this.sixthDigitConfirmation = ''
        return swal.fire('Failed', 'Security PIN not match!', 'error')
      }

      try {
        this.isLoading = true
        const result = await this.requestRegister({
          ...this.registerData,
          securityPIN
        })

        swal.fire(result.status, 'Registration success now check your email and activate your account', 'success')
        this.$router.push({ path: '/auth/login' })
      } catch (error) {
        swal.fire(error.status, error.message, 'error')
        this.$router.push({ path: '/auth/register' })
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
