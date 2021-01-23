<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Home row container mx-auto">
    <aside class="col-md-4 p-3">
      <ul>
        <li class="mb-5">
          <router-link class="text-decoration-none" to="/home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 3.5H3.5V11.6667H11.6667V3.5Z" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.5002 3.5H16.3335V11.6667H24.5002V3.5Z" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.5002 16.333H16.3335V24.4997H24.5002V16.333Z" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.6667 16.333H3.5V24.4997H11.6667V16.333Z" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li class="mb-5">
          <router-link class="text-decoration-none" to="/home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 22.1663V5.83301" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.83337 13.9997L14 5.83301L22.1667 13.9997" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ms-3">Transfer</span>
          </router-link>
        </li>
        <li class="mb-5">
          <router-link class="text-decoration-none" to="/home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5.83301V22.1663" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.8335 14H22.1668" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ms-3">Top Up</span>
          </router-link>
        </li>
        <li class="mb-5">
          <router-link class="text-decoration-none" to="/home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3332 24.5V22.1667C23.3332 20.929 22.8415 19.742 21.9663 18.8668C21.0912 17.9917 19.9042 17.5 18.6665 17.5H9.33317C8.09549 17.5 6.90851 17.9917 6.03334 18.8668C5.15817 19.742 4.6665 20.929 4.6665 22.1667V24.5" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.0002 12.8333C16.5775 12.8333 18.6668 10.744 18.6668 8.16667C18.6668 5.58934 16.5775 3.5 14.0002 3.5C11.4228 3.5 9.3335 5.58934 9.3335 8.16667C9.3335 10.744 11.4228 12.8333 14.0002 12.8333Z" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ms-3">Profile</span>
          </router-link>
        </li>
        <li @click="logout">
          <router-link class="text-decoration-none" to="/home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.6665 19.8337L24.4998 14.0003L18.6665 8.16699" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.5 14H10.5" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ms-3">Logout</span>
          </router-link>
        </li>
      </ul>
    </aside>
    <main class="col-md-8 p-3">
      <div class="card">
        <div class="card-body"></div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert2'
import Header from '@/components/Header'

export default {
  name: 'Home',
  components: {
    Header
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
    ...mapActions(['getUser']),
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push({ path: '/auth/login' })
    }
  }
}
</script>

<style scoped lang="css">
div.Home ul {
  list-style: none;
}
</style>