<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="InputAmount row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <p class="fw-bold fs-5">Transfer money</p>
      <div class="d-flex align-items-center mb-5">
        <div class="me-3">
          <img :src="receiver.avatar" class="avatar-picture" alt="Avatar picture">
        </div>
        <div>
          <p class="fw-bold mb-0">{{ receiver.firstName + ' ' + receiver.lastName }}</p>
          <p class="small text-muted mb-0">{{ receiver.phoneNumber }}</p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-6">
          <p class="text-muted">Type the amount you want to transfer and then press continue to the next steps.</p>
        </div>
      </div>
      <form @submit.prevent="transfer">
          <div class="row justify-content-center">
            <div class="col-md-5">
              <div class="mb-3">
                <input type="text" class="form-control" v-model="amount" placeholder="0.00">
              </div>
            </div>
          </div>
          <p class="text-center fw-bold fs-5 text-muted">Rp{{ user.balance }} available</p>
          <div class="row  justify-content-center mb-5">
            <div class="col-md-5">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3.0003C17.2626 2.73766 17.5744 2.52932 17.9176 2.38718C18.2608 2.24503 18.6286 2.17188 19 2.17188C19.3714 2.17187 19.7392 2.24503 20.0824 2.38718C20.4256 2.52932 20.7374 2.73766 21 3.0003C21.2626 3.26295 21.471 3.57475 21.6131 3.91791C21.7553 4.26107 21.8284 4.62887 21.8284 5.0003C21.8284 5.37174 21.7553 5.73953 21.6131 6.08269C21.471 6.42585 21.2626 6.73766 21 7.0003L7.5 20.5003L2 22.0003L3.5 16.5003L17 3.0003Z" stroke="#A9A9A9" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <input type="text" class="form-control" v-model="notes" placeholder="Add some notes">
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="inputSecurityPIN" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Input security PIN</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="firstDigit">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="secondDigit">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="thirdDigit">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="forthDigit">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="fifthDigit">
                    </div>
                    <div class="col-2">
                      <input type="text" class="form-control text-center" v-model="sixthDigit">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <a class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                  <button @click="transfer" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                </div>
              </div>
            </div>
          </div>
          <!-- End of modal -->
        </form>
        <div class="row justify-content-end">
          <div class="col-md-3 d-grid">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#inputSecurityPIN">Continue</button>
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

export default {
  name: 'InputAmount',
  data () {
    return {
      amount: '',
      notes: '',
      firstDigit: '',
      secondDigit: '',
      thirdDigit: '',
      forthDigit: '',
      fifthDigit: '',
      sixthDigit: ''
    }
  },
  components: {
    Header,
    Aside,
    Footer
  },
  computed: {
    ...mapGetters(['user', 'credentials', 'receiver'])
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
      await this.getReceiver(this.$route.params.id)
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
      return this.$router.push({ path: '/search-receiver' })
    }
  },
  methods: {
    ...mapActions(['getUser', 'getReceiver', 'requestTransfer']),
    async transfer () {
      if (parseInt(this.amount) < 1 || isNaN(parseInt(this.amount))) {
        return swal.fire('Error', 'Fill the forms with a valid value!', 'error')
      }

      const data = {
        sender: this.user.id,
        receiver: this.receiver.id,
        amount: this.amount,
        notes: this.notes || '-',
        securityPIN: this.firstDigit + this.secondDigit + this.thirdDigit + this.forthDigit + this.fifthDigit + this.sixthDigit
      }
      
      try {
        const result = await this.requestTransfer(data)
        this.$router.push({ path: `/transfer-result/${result.data}` })
      } catch (error) {
        if (error.message === 'Access denied') {
          localStorage.removeItem('userId')
          localStorage.removeItem('token')
          return this.$router.push('/auth/login')
        }
        swal.fire(error.status, error.message, 'error')
      }
    }
  }
}
</script>

<style scoped lang="css">

</style>