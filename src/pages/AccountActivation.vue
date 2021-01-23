<template>
  <div class="AccountActivation container mx-auto" v-if="!isLoading">
    <h1 class="text-center my-5 text-primary" v-if="activationSuccess">Account activated!</h1>
    <h1 class="text-center my-5 text-danger" v-if="!activationSuccess">Account activation failed!</h1>
    <p class="text-center my-3" v-if="!activationSuccess">{{ message }}</p>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <router-link to="/auth/login" class="btn btn-primary p-1 d-block" v-if="activationSuccess">Login now</router-link>
        <router-link to="/auth/login" class="btn btn-primary p-1 d-block" v-if="!activationSuccess">Login instead</router-link>
      </div>
    </div>
  </div>
  <div class="loading-container" v-if="isLoading">
    <div class="loader"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AccountActivation',
  data () {
    return {
      isLoading: false,
      activationSuccess: false,
      message: ''
    }
  },
  async created () {
    console.log(this.$route.query.userId)
    console.log(this.$route.query.activationToken)
    const data = {
      userId: this.$route.query.userId || '',
      activationToken: this.$route.query.activationToken || ''
    }
    try {
      this.isLoading = true
      const result = await this.activateAccount(data)
      this.message = result.message
      this.activationSuccess = true
      this.isLoading = false
    } catch (error) {
      this.message = error.message
      this.activationSuccess = false
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions(['activateAccount'])
  }
}
</script>

<style scoped lang="css">
.loader {
  margin: 150px auto;
  border: 5px solid #858585;
  border-top: 5px solid rgba(255, 255, 255, .15);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
