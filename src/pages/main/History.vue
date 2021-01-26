<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Home row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <h2>Transfer history</h2>
      <div class="row mt-5 justify-content-center">
        <div class="col-md-8">
          <ul class="list-group"  v-if="transfers.length > 0">
            <li v-for="transfer in transfers" :key="transfer.id" class="list-group-item d-flex align-items-center" :data-coba="transfer.sender.id">
              <img v-if="transfer.sender.id !== credentials.userId" :src="transfer.sender.avatar" class="avatar-picture sender me-2" alt="Profile">
              <img  v-if="transfer.sender.id === credentials.userId" :src="baseUrl + '/images/' + transfer.transfer.receiver.avatar" class="avatar-picture me-2" alt="Profile">
              <span class="d-flex flex-column align-items-start justify-content-center">
                <p class="fw-bold my-0" v-if="transfer.sender.id !== credentials.userId">{{ transfer.sender.firstName + ' ' + transfer.sender.lastName }}</p>
                <p class="fw-bold my-0" v-if="transfer.sender.id === credentials.userId">{{ transfer.transfer.receiver.firstName + ' ' + transfer.transfer.receiver.lastName }}</p>
                <p class="small text-muted my-0">Transfer</p>
              </span>
              <p class="text-success fw-bold ms-auto" v-if="transfer.sender.id !== credentials.userId">+Rp{{ transfer.amount }}</p>
              <p class="text-danger fw-bold ms-auto" v-if="transfer.sender.id === credentials.userId">-Rp{{ transfer.amount }}</p>
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
  name: 'History',
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
      if (error.message !== 'Access denied') {
        swal.fire(error.status, error.message, 'error')
      }
    }
  },
  methods: {
    ...mapActions(['getUser', 'getTransfers'])
  }
}
</script>

<style scoped lang="css">

</style>