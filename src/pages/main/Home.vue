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
      <div class="row mt-4">
        <div class="col-md-7 mb-2">
          <div class="card" style="height: 250px;">
            <div class="card-header">Weekly activitiy</div>
            <div class="card-body d-flex justify-content-around align-items-end">
              <div v-for="transfer in transfers" :key="transfer.id" class="bar bg-primary rounded-pill" :style="{ width: '10px', height: parseInt(transfer.amount) / biggestAmount * 100 + '%', position: 'relative' }">
                <p class="position-absolute bg-light small text-muted">Rp{{ transfer.amount }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 mb-2">
          <div class="d-flex justify-content-between">
            <p class="fw-bold">Transaction history</p>
            <!-- <router-link to="/home" class="d-block text-end mb-3">see all</router-link> -->
          </div>
          <ul class="list-group"  v-if="transfers.length > 0">
            <li v-for="transfer in transfers" :key="transfer.id" class="list-group-item d-flex justify-content-between align-items-center" :data-coba="transfer.sender.id">
              <img v-if="transfer.sender.id !== credentials.userId" :src="transfer.sender.avatar" class="avatar-picture sender" alt="Profile">
              <img  v-if="transfer.sender.id === credentials.userId" :src="baseUrl + '/images/' + transfer.transfer.receiver.avatar" class="avatar-picture" alt="Profile">
              <span class="d-flex flex-column align-items-start justify-content-center">
                <p class="fw-bold my-0" v-if="transfer.sender.id !== credentials.userId">{{ transfer.sender.firstName + ' ' + transfer.sender.lastName }}</p>
                <p class="fw-bold my-0" v-if="transfer.sender.id === credentials.userId">{{ transfer.transfer.receiver.firstName + ' ' + transfer.transfer.receiver.lastName }}</p>
                <p class="small text-muted my-0">Transfer</p>
              </span>
              <p class="text-success fw-bold" v-if="transfer.sender.id !== credentials.userId">+Rp{{ transfer.amount }}</p>
              <p class="text-danger fw-bold" v-if="transfer.sender.id === credentials.userId">-Rp{{ transfer.amount }}</p>
            </li>
          </ul>
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
  data () {
    return {
      baseUrl: ''
    }
  },
  components: {
    Header,
    Aside
  },
  computed: {
    ...mapGetters(['user', 'credentials', 'transfers']),
    biggestAmount () {
      const transfers = this.transfers
        const amounts = transfers.sort((a, b) => {
          return parseInt(b.amount) - parseInt(a.amount)
        })
        return amounts[0].amount
    }
  },
  async mounted () {
    try {
      this.baseUrl = process.env.VUE_APP_BACKEND_URL
      await this.getUser(this.credentials.userId)
      await this.getTransfers({
        userId: this.credentials.userId,
        page: this.$route.query.page || 1
      })
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
    }
  },
  methods: {
    ...mapActions(['getUser', 'getTransfers'])
  }
}
</script>

<style scoped lang="css">

</style>