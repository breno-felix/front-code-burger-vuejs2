<template>
  <b-container fluid class="container-wrap h-100 m-0 p-0">
    <b-row align-v="center" align-h="center" class="h-100">
      <b-col cols="4" class="container-left h-75 p-0 d-none d-lg-block"></b-col>

      <b-col cols="12" sm="8" lg="4" class="container-right h-100 h-sm-75 pt-5 ">
        <b-row align-h="center">
          <b-col cols="8" class="mb-5">
            <h1><img class="img-fluid" src="../../assets/logo.svg" alt="logo code burger image"></h1>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <b-col cols="2">
            <h2>Login</h2>
          </b-col>
        </b-row>

        <b-form @submit.prevent="onSubmit">
          <b-row align-h="center">
            <b-col cols="10" class="mb-4">
              <b-form-group label="Email:" label-for="email">
                <b-form-input id="email" v-model="email" type="email" placeholder="user@mail.com" required></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="10" class="mb-4">
              <b-form-group label="Senha:" label-for="password">
                <b-form-input id="password" v-model="password" type="password" placeholder="********"
                  required></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="10" class="mt-5">
              <div class="col-4 mb-2">
                <DefaultButton :buttonText="'Acessar →'"></DefaultButton>
              </div>
              <div>
                <p class="sign-up">Não possui conta? <a href="#">Cadastre-se</a></p>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import DefaultButton from '@/components/DefaultButton.vue'

export default {
  name: 'Login',
  components: {
    DefaultButton
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      const credentials = {
        email: this.email,
        password: this.password
      }
      console.log(credentials)
    }
  }
}
</script>

<style scoped>
.container-wrap {
  background: url('../../assets/backgroud.svg');
}

.container-left {
  background: url('../../assets/login-image.svg');
  background-size: cover;
  background-position: center;
  border-radius: 10px 0 0 10px;
}

.container-right {
  background: #373737;
  border-radius: 0 10px 10px 0;
  color: white;
}

a {
  color: white;
}

@media (min-width: 576px) {
  .h-sm-75 {
    height: 75% !important;
  }
}
</style>