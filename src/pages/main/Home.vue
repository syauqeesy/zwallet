<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Home row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <div class="card bg-primary text-white">
        <div class="card-body row">
          <div class="col-md-10 mb-1">
            <p class="small mb-1">Balance</p>
            <p class="fw-bold fs-3">{{ user.balance }}</p>
            <p class="small mb-0 mt-1">{{ user.phoneNumber }}</p>
          </div>
          <div class="col-md-2 mt-1">
            <div class="d-grid mb-4">
            <button class="btn btn-outline-light d-block" @click="$router.push({ path: '/search-receiver' })">Transfer</button>
            </div>
            <div class="d-grid">
            <button class="btn btn-outline-light d-block">Top Up</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert2'
import Header from '@/components/Header'
import Aside from '@/components/Aside'

export default {
  name: 'Home',
  components: {
    Header,
    Aside
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
    ...mapActions(['getUser'])
  }
}
</script>

<style scoped lang="css">

</style>