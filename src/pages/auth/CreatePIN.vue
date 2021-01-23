<template>
  <form class="my-5" @submit.prevent="register">
    <div class="row">
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="firstDigit" :class="{'is-invalid': firstDigitValidity !== 'valid' && firstDigitValidity !== 'pending'}" ref="firstDigit" @keyup="moveToSecondDigit" @blur="validateFirstDigit" autofocus>
        </div>
      </div>
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="secondDigit" :class="{'is-invalid': secondDigitValidity !== 'valid' && secondDigitValidity !== 'pending'}" ref="secondDigit" @keyup="moveToThirdDigit" @blur="validateSecondDigit">
        </div>
      </div>
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="thirdDigit" :class="{'is-invalid': thirdDigitValidity !== 'valid' && thirdDigitValidity !== 'pending'}" ref="thirdDigit" @keyup="moveToForthDigit" @blur="validateThirdDigit">
        </div>
      </div>
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="forthDigit" :class="{'is-invalid': forthDigitValidity !== 'valid' && forthDigitValidity !== 'pending'}" ref="forthDigit" @keyup="moveToFifthDigit" @blur="validateForthDigit">
        </div>
      </div>
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="fifthDigit" :class="{'is-invalid': fifthDigitValidity !== 'valid' && fifthDigitValidity !== 'pending'}" ref="fifthDigit" @keyup="moveToSixthDigit" @blur="validateFifthDigit">
        </div>
      </div>
      <div class="col-2 p-1">
        <div class="mb-3">
          <input type="text" class="form-control p-2 text-center" v-model="sixthDigit" :class="{'is-invalid': sixthDigitValidity !== 'valid' && sixthDigitValidity !== 'pending'}" ref="sixthDigit" @blur="validateSixthDigit">
        </div>
      </div>
    </div>
    <div class="d-grid mt-5">
      <button class="btn btn-primary p-2" type="submit">Confirm</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreatePIN',
  data () {
    return {
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
  methods: {
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
    register () {
      const securityPIN = this.firstDigit + this.secondDigit + this.thirdDigit + this.forthDigit + this.fifthDigit + this.sixthDigit
      console.log(securityPIN)
    }
  }
}
</script>

<style scoped lang="css">

</style>