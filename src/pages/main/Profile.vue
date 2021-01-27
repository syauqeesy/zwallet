<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Profile row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <img :src="user.avatar" alt="Profil" class="d-block mx-auto avatar-picture">
      <div class="input-container mb-4 mt-2">
        <input v-if="!isLoading" type="file" @change="update($event)">
        <svg v-if="!isLoading" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3.0003C17.2626 2.73766 17.5744 2.52932 17.9176 2.38718C18.2608 2.24503 18.6286 2.17188 19 2.17188C19.3714 2.17187 19.7392 2.24503 20.0824 2.38718C20.4256 2.52932 20.7374 2.73766 21 3.0003C21.2626 3.26295 21.471 3.57475 21.6131 3.91791C21.7553 4.26107 21.8284 4.62887 21.8284 5.0003C21.8284 5.37174 21.7553 5.73953 21.6131 6.08269C21.471 6.42585 21.2626 6.73766 21 7.0003L7.5 20.5003L2 22.0003L3.5 16.5003L17 3.0003Z" stroke="#A9A9A9" stroke-opacity="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="loader" v-if="isLoading"></div>
      </div>
      <p class="text-center fw-bold fs-5 mb-2">{{ user.firstName + ' ' + user.lastName }}</p>
      <p class="text-muted text-center small">{{ user.phoneNumber }}</p>

      <div class="row justify-content-center mt-4">
        <div class="col-md-6 d-grid mt-3">
          <button class="btn btn-outline-secondary" @click="$router.push({ path: '/edit-profile' })">Edit profile</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6 d-grid mt-3">
          <button class="btn btn-outline-secondary" @click="$router.push({ path: '/change-password' })">Change password</button>
        </div>
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-6 d-grid">
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
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
  name: 'Profile',
  components: {
    Header,
    Aside,
    Footer
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['user', 'credentials'])
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
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
    ...mapActions(['getUser', 'updateProfile']),
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push({ path: '/auth/login' })
    },
    async update (event) {
      const file = event.target.files[0]
      const formData = new FormData()

      formData.append('avatar', file, file.name)
      formData.append('id', this.credentials.userId)

      try {
        this.isLoading = true
        await this.updateProfile(formData)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        swal.fire(error.status, error.message, 'error')
      }
    }
  }
}
</script>

<style scoped lang="css">
div.input-container {
  width: 20px;
  /* border: 1px solid blue; */
  position: relative;
  cursor: pointer;
  margin: auto;
}

div.input-container input {
  width: 100%;
  cursor: pointer;
  opacity: 0;
}

div.input-container svg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  z-index: -1;
}

.user {
  cursor: pointer;
}

.loader {
  margin: auto;
  border: 5px solid #858585;
  border-top: 5px solid rgba(255, 255, 255, .85);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>