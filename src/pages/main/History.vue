<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Home row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <h2>Transfer history</h2>
      <div class="row justify-content-end mt-5">
        <div class="col-3">
          <label for="sortBy">Sort</label>
          <select id="sortBy" v-model="sortBy" @change="$router.push({ path: '/history', query: { page: $route.query.page || 1, sortBy: sortBy, order: $route.query.order || 'DESC' } })" class="form-select">
            <option selected>Sort</option>
            <option value="createdAt">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div class="col-3">
          <label for="order">Order</label>
          <select id="order" v-model="order" @change="$router.push({ path: '/history', query: { page: $route.query.page || 1, order: order, sortBy: $route.query.sortBy || 'createdAt' } })" class="form-select">
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>
      <div class="row mt-4 justify-content-center">
        <div class="col-md-8">
          <ul class="list-group" v-if="transfers.length > 0">
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
      <nav v-if="transfers.length > 0" class="mt-5">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: !transfersPagination.previous }">
            <router-link class="page-link" :to="{ path: '/history', query: { page: transfersPagination.previous } }">Previous</router-link>
          </li>
          <li class="page-item disabled"><a class="page-link">{{ transfersPagination.current }}</a></li>
          <li class="page-item" :class="{ disabled: !transfersPagination.next }">
            <router-link class="page-link" :to="{ path: '/history', query: { page: transfersPagination.next } }">Next</router-link>
          </li>
        </ul>
      </nav>
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
  name: 'History',
  data () {
    return {
      baseUrl: '',
      moment,
      order: '',
      sortBy: ''
    }
  },
  components: {
    Header,
    Aside,
    Footer
  },
  computed: {
    ...mapGetters(['user', 'credentials', 'transfers', 'transfersPagination']),
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
        page: this.$route.query.page || 1,
        sortBy: this.$route.query.sortBy || 'createdAt',
        order: this.$route.query.order || 'DESC'
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
  },
  watch: {
    async $route () {
      try {
        await this.getTransfers({
          userId: this.credentials.userId,
          page: this.$route.query.page || 1,
          sortBy: this.$route.query.sortBy || 'createdAt',
          order: this.$route.query.order || 'DESC'
        })
      } catch (error) {
        if (error.message !== 'Access denied') {
          swal.fire(error.status, error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="css">

</style>