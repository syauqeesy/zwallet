<template>
  <Header :avatar="user.avatar" :fullName="user.firstName + ' ' + user.lastName" :phoneNumber="user.phoneNumber" />
  <div class="Profile row container mx-auto">
    <Aside />
    <main class="col-md-8 p-3">
      <h2 class="fs-4 mb-5">Edit profile</h2>
      <form @submit.prevent="update">
        <div class="row">
          <div class="col-md-8 mb-3">
            <label for="firstName" class="form-label">First name</label>
            <input type="text" class="form-control" id="firstName" :class="{'is-invalid': firstNameValidity !== 'valid' && firstNameValidity !== 'pending'}" v-model.trim="firstName" @blur="validateFirstName" placeholder="First name" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="firstNameValidity === 'blank'">First name is required!</p>
            <p class="invalid-feedback m-0" v-if="firstNameValidity === 'tooShort'">First name is too short!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mb-3">
            <label for="lastName" class="form-label">Last name</label>
            <input type="text" class="form-control" id="lastName" :class="{'is-invalid': lastNameValidity !== 'valid' && lastNameValidity !== 'pending'}" v-model.trim="lastName" @blur="validateLastName" placeholder="Last name" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="lastNameValidity === 'blank'">Last name is required!</p>
            <p class="invalid-feedback m-0" v-if="lastNameValidity === 'tooShort'">Last name is too short!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mb-3">
            <label for="phoneNumber" class="form-label">Phone number</label>
            <input type="text" class="form-control" id="phoneNumber" :class="{'is-invalid': phoneNumberValidity !== 'valid' && phoneNumberValidity !== 'pending'}" v-model.trim="phoneNumber" @blur="validatePhoneNumber" placeholder="Phone number" autocomplete="off">
            <p class="invalid-feedback m-0" v-if="phoneNumberValidity === 'blank'">Phone number is required!</p>
            <p class="invalid-feedback m-0" v-if="phoneNumberValidity === 'tooShort'">Phone number is too short!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 d-grid mb-3">
            <button class="btn btn-primary" type="submit">Edit profile</button>
          </div>
        </div>
      </form>
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
      isLoading: false,
      firstName: '',
      firstNameValidity: 'pending',
      lastName: '',
      lastNameValidity: 'pending',
      phoneNumber: '',
      phoneNumberValidity: 'pending'
    }
  },
  computed: {
    ...mapGetters(['user', 'credentials'])
  },
  async mounted () {
    try {
      await this.getUser(this.credentials.userId)
      this.firstName = this.user.firstName
      this.lastName = this.user.lastName
      this.phoneNumber = this.user.phoneNumber
    } catch (error) {
      swal.fire(error.status, error.message, 'error')
    }
  },
  methods: {
    ...mapActions(['getUser', 'updateProfile']),
    validateFirstName () {
      if (this.firstName === '') {
        return this.firstNameValidity = 'blank'
      }
      if (this.firstName.length < 3) {
        return this.firstNameValidity = 'tooShort'
      }
      this.firstNameValidity = 'valid'
    },
    validateLastName () {
      if (this.lastName === '') {
        return this.lastNameValidity = 'blank'
      }
      if (this.lastName.length < 3) {
        return this.lastNameValidity = 'tooShort'
      }
      this.lastNameValidity = 'valid'
    },
    validatePhoneNumber () {
      if (this.phoneNumber === '') {
        return this.phoneNumberValidity = 'blank'
      }
      if (this.phoneNumber.length < 3) {
        return this.phoneNumberValidity = 'tooShort'
      }
      this.phoneNumberValidity = 'valid'
    },
    async update () {
      if (this.firstNameValidity !== 'valid' && this.firstNameValidity !== 'pending' || this.lastNameValidity !== 'valid'  && this.lastNameValidity !== 'pending' || this.phoneNumberValidity !== 'valid'  && this.phoneNumberValidity !== 'pending') {
        return swal.fire('Error', 'Fill the forms with a valid value!', 'error')
      }
      const formData = new FormData()
      formData.append('id', this.credentials.userId)
      formData.append('firstName', this.firstName)
      formData.append('lastName', this.lastName)
      formData.append('phoneNumber', this.phoneNumber)

      try {
        this.isLoading = true
        const result = await this.updateProfile(formData)
        this.isLoading = false
        swal.fire(result.status, result.message, 'success')
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