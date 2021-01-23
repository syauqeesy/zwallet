<template>
  <form class="my-5" @submit.prevent="register">
    <div class="row">
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="firstDigit" :class="{'is-invalid': firstDigitValidity !== 'valid' && firstDigitValidity !== 'pending'}" ref="firstDigit" @keyup="moveToSecondDigit" @blur="validateFirstDigit" autofocus>
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="secondDigit" :class="{'is-invalid': secondDigitValidity !== 'valid' && secondDigitValidity !== 'pending'}" ref="secondDigit" @keyup="moveToThirdDigit" @blur="validateSecondDigit">
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="thirdDigit" :class="{'is-invalid': thirdDigitValidity !== 'valid' && thirdDigitValidity !== 'pending'}" ref="thirdDigit" @keyup="moveToForthDigit" @blur="validateThirdDigit">
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="forthDigit" :class="{'is-invalid': forthDigitValidity !== 'valid' && forthDigitValidity !== 'pending'}" ref="forthDigit" @keyup="moveToFifthDigit" @blur="validateForthDigit">
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="fifthDigit" :class="{'is-invalid': fifthDigitValidity !== 'valid' && fifthDigitValidity !== 'pending'}" ref="fifthDigit" @keyup="moveToSixthDigit" @blur="validateFifthDigit">
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <input type="text" class="form-control text-center" v-model="sixthDigit" :class="{'is-invalid': sixthDigitValidity !== 'valid' && sixthDigitValidity !== 'pending'}" ref="sixthDigit" @blur="validateSixthDigit">
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
      firstDigitValidity: 'pending',
      secondDigit: '',
      secondDigitValidity: 'pending',
      thirdDigit: '',
      thirdDigitValidity: 'pending',
      forthDigit: '',
      forthDigitValidity: 'pending',
      fifthDigit: '',
      fifthDigitValidity: 'pending',
      sixthDigit: '',
      sixthDigitValidity: 'pending'
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
    validateFirstDigit () {
      if (this.firstDigit.length < 1 || this.firstDigit.length > 1) {
        return this.firstDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.firstDigit))) {
        return this.firstDigitValidity = 'invalid'
      }
      return this.firstDigitValidity = 'valid'
    },
    moveToSecondDigit () {
      this.$refs.firstDigit.blur()
      this.$refs.secondDigit.focus()
    },
    validateSecondDigit () {
      if (this.secondDigit.length < 1 || this.secondDigit.length > 1) {
        return this.secondDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.secondDigit))) {
        return this.secondDigitValidity = 'invalid'
      }
      return this.secondDigitValidity = 'valid'
    },
    moveToThirdDigit () {
      this.$refs.secondDigit.blur()
      this.$refs.thirdDigit.focus()
    },
    validateThirdDigit () {
      if (this.thirdDigit.length < 1 || this.thirdDigit.length > 1) {
        return this.thirdDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.thirdDigit))) {
        return this.thirdDigitValidity = 'invalid'
      }
      return this.thirdDigitValidity = 'valid'
    },
    moveToForthDigit () {
      this.$refs.thirdDigit.blur()
      this.$refs.forthDigit.focus()
    },
    validateForthDigit () {
      if (this.forthDigit.length < 1 || this.forthDigit.length > 1) {
        return this.forthDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.forthDigit))) {
        return this.forthDigitValidity = 'invalid'
      }
      return this.forthDigitValidity = 'valid'
    },
    moveToFifthDigit () {
      this.$refs.forthDigit.blur()
      this.$refs.fifthDigit.focus()
    },
    validateFifthDigit () {
      if (this.fifthDigit.length < 1 || this.fifthDigit.length > 1) {
        return this.fifthDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.fifthDigit))) {
        return this.fifthDigitValidity = 'invalid'
      }
      return this.fifthDigitValidity = 'valid'
    },
    moveToSixthDigit () {
      this.$refs.fifthDigit.blur()
      this.$refs.sixthDigit.focus()
    },
    validateSixthDigit () {
      if (this.sixthDigit.length < 1 || this.sixthDigit.length > 1) {
        return this.sixthDigitValidity = 'invalid'
      }
      if (isNaN(parseInt(this.sixthDigit))) {
        return this.sixthDigitValidity = 'invalid'
      }
      return this.sixthDigitValidity = 'valid'
    },
    async register () {
      const securityPIN = this.firstDigit + this.secondDigit + this.thirdDigit + this.forthDigit + this.fifthDigit + this.sixthDigit
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
