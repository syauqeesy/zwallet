<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Home row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <div class="card bg-primary text-white">
        <div class="card-body row">
          <div class="col-md-10 mb-1">
            <p class="small mb-1">Balance</p>
            <p class="fw-bold fs-3">Rp{{ user.balance }}</p>
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
          <div class="card border-primary">
            <div class="card-header  text-white bg-primary">Last activitiy</div>
            <div class="card-body">
              <apexchart width="100%" type="bar" :options="chartOptions" :series="chartSeries"></apexchart>
            </div>
          </div>
        </div>
        <div class="col-md-5 mb-2">
          <div class="d-flex justify-content-between">
            <p class="fw-bold">Transfer history</p>
            <router-link to="/history" class="d-block text-end mb-3">see all</router-link>
          </div>
          <ul class="list-group"  v-if="transfers.length > 0">
            <li v-for="transfer in transfers" :key="transfer.id" class="list-group-item d-flex align-items-center">
              <img :src="baseUrl + '/images/' + transfer.transfer.receiver.avatar" class="avatar-picture me-3" alt="Profile">
              <span class="d-flex flex-column align-items-start justify-content-center">
                <p class="fw-bold my-0">{{ transfer.transfer.receiver.firstName + ' ' + transfer.transfer.receiver.lastName }}</p>
                <p class="small text-muted my-0">{{ moment(transfer.createdAt).format('L') }}</p>
              </span>
              <p class="fw-bold ms-auto">Rp{{ transfer.amount }}</p>
            </li>
          </ul>
        </div>
      </div>
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
import moment from 'moment'

export default {
  name: 'Home',
  data () {
    return {
      baseUrl: '',
      moment
    }
  },
  components: {
    Header,
    Aside,
    Footer
  },
  computed: {
    ...mapGetters(['user', 'credentials', 'transfers']),
    chartOptions () {
      return {
        chart: {
          id: "Weekly activity chart",
        },
        colors: ['#0D6EFD'],
        xaxis: {
          categories: [...new Set(this.transfers.map(transfer => moment(transfer.createdAt).format('L')))].map(item => moment(item).format('ddd')),
        }
      }
    },
    chartSeries () {
      return [
        {
          name: 'Transfer Amount',
          data: this.transfers.map(transfer => transfer.amount)
        }
      ]
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
      if (error.message === 'Access denied') {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        return this.$router.push('/auth/login')
      }
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