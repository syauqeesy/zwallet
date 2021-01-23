<template>
  <div class="Home">
    {{ user.userName }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'Home',
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