<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="TransferResult row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <div class="row">
        <div class="col-12 mb-5">
          <img src="@/assets/success.png" class="d-block mx-auto" alt="Failed">
        </div>
        <div class="col-12">
          <p class="fw-bold text-center">Transfer success</p>
        </div>
        <div class="col-12 mt-5">
          <p class="text-muted mb-1">Amount</p>
          <p class="fw-bold">Rp{{ transfer.amount }}</p>
        </div>
        <div class="col-12 mt-3">
          <p class="text-muted mb-1">Balance left</p>
          <p class="fw-bold">Rp{{ user.balance }}</p>
        </div>
        <div class="col-12 mt-3">
          <p class="text-muted mb-1">Date & Time</p>
          <p class="fw-bold">{{ moment(transfer.createdAt).format('MMMM D YYYY - LT') }}</p>
        </div>
        <div class="col-12 mt-3">
          <p class="text-muted mb-1">Notes</p>
          <p class="fw-bold">{{ transfer.notes }}</p>
        </div>
        <div class="col-12 mt-4">
          <p>Transfer to</p>
          <div class="d-flex align-items-center mb-5">
            <div class="me-3">
              <img :src="receiver.avatar" class="avatar-picture" alt="Avatar picture">
            </div>
            <div>
              <p class="fw-bold mb-0">{{ receiver.firstName + ' ' + receiver.lastName }}</p>
              <p class="small text-muted mb-0">{{ receiver.phoneNumber }}</p>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="row justify-content-end">
            <div class="col-md-3 d-grid mt-2">
              <button class="btn btn-outline-primary">Print PDF</button>
            </div>
            <div class="col-md-3 d-grid mt-2">
              <button class="btn btn-primary" @click="$router.push({ path: '/home' })">Back to home</button>
            </div>
          </div>
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
  name: 'TransferResult',
  data () {
    return {
      isSuccess: true,
      moment,
      receiver: {}
    }
  },
  components: {
    Header,
    Aside,
    Footer
  },
  computed: {
    ...mapGetters(['user', 'credentials', 'transfer'])
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
      await this.getTransferById(this.$route.params.id)
      this.receiver = this.transfer.transfer.receiver
      this.receiver.avatar = process.env.VUE_APP_BACKEND_URL + '/images/' + this.receiver.avatar
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
      return this.$router.push({ path: '/home' })
    }
  },
  methods: {
    ...mapActions(['getUser', 'getTransferById'])
  }
}
</script>

<style scoped lang="css">

</style>