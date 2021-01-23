<template>
  <div class="AccountActivation container mx-auto">
    <h1 class="text-center my-5 text-primary" v-if="activationSuccess">Account activated!</h1>
    <h1 class="text-center my-5 text-danger" v-if="!activationSuccess">Account activation failed!</h1>
    <p class="text-center my-3" v-if="!activationSuccess">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cumque, provident pariatur minus quam inventore.</p>
    <div class="row justify-content-center">
      <div class="col-md-5">
        <router-link to="/auth/login" class="btn btn-primary p-1 d-block" v-if="activationSuccess">Login now</router-link>
        <router-link to="/auth/login" class="btn btn-primary p-1 d-block" v-if="!activationSuccess">Login instead</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountActivation',
  data () {
    return {
      isLoading: false,
      activationSuccess: false
    }
  },
  mounted () {
    console.log(this.$route.query.userId)
    console.log(this.$route.query.activationToken)
  }
}
</script>

<style scoped lang="css">

</style>