<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="SearchReceiver row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <form @submit.prevent="search">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="keyword" placeholder="Search receiver">
          <button class="btn btn-outline-secondary" type="submit">Search</button>
        </div>
      </form>
      <div class="card mb-3 user" @click="$router.push({ path: `/input-amount/${user.id}` })" v-for="user in filteredUsers" :key="user.id">
        <div class="card-body d-flex align-items-center">
          <div class="me-3">
            <img :src="user.avatar" class="avatar-picture d-inline" alt="Profile">
          </div>
          <div>
            <p class="my-0 fw-bold">{{ user.firstName + ' ' + user.lastName }}</p>
            <p class="my-0 small text-muted">{{ user.phoneNumber }}</p>
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
  name: 'SearchReceiver',
  data () {
    return {
      keyword: ''
    }
  },
  components: {
    Header,
    Aside
  },
  computed: {
    ...mapGetters(['user', 'users', 'credentials']),
    filteredUsers () {
      return this.users.filter(user => user.id !== this.credentials.userId)
    }
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
      await this.getUsers({
          keyword: this.$route.query.keyword || '',
          page: this.$route.query.page || 1
        })
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
    }
  },
  methods: {
    ...mapActions(['getUser', 'getUsers']),
    search () {
      this.$router.push({ name: 'SearchReceiver', query: { keyword: this.keyword }})
      this.keyword = ''
    }
  },
  watch: {
    async $route () {
      try {
        await this.getUsers({
          keyword: this.$route.query.keyword || '',
          page: this.$route.query.page || 1
        })
      } catch (error) {
        swal.fire(error.status, error.message, 'error')
      }
    }
  }
}
</script>

<style scoped lang="css">
.user {
  cursor: pointer;
}
</style>