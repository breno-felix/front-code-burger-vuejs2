<template>
  <b-container fluid class="container-wrap h-100 m-0 p-0">
    <b-row align-v="center" align-h="center" class="h-100">
      <b-col cols="4" class="container-left h-sm-87 p-0 d-none d-lg-block"></b-col>

      <b-col cols="12" sm="8" lg="4" class="container-right h-100 h-sm-87 pt-4 ">
        <b-row align-h="center">
          <b-col cols="8" class="mb-2">
            <h1><img class="img-fluid" src="../../assets/logo.svg" alt="logo code burger image"></h1>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <b-col cols="3" sm="2" lg="4" class="p-0">
            <h3>Cadastro</h3>
          </b-col>
        </b-row>

        <b-form novalidate @submit.prevent="onSubmit">
          <b-row align-h="center">
            <b-col cols="10">
              <b-form-group label="Nome:" label-for="name">
                <b-form-input id="name" v-model.trim="$v.name.$model" :state="!($v.name.$error)" type="text"
                  placeholder="nome do usuário" required></b-form-input>
                <b-form-invalid-feedback :state="!($v.name.$error)">
                  O nome é obrigatório.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group label="Email:" label-for="email">
                <b-form-input id="email" v-model.trim="$v.email.$model" :state="!($v.email.$error)" type="email"
                  placeholder="user@mail.com" required></b-form-input>
                <b-form-invalid-feedback :state="!($v.email.$error)">
                  Um email válido é necessário.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group label="Senha:" label-for="password">
                <b-form-input id="password" v-model.trim="$v.password.$model" :state="!($v.password.$error)"
                  type="password" placeholder="********" required></b-form-input>
                <b-form-invalid-feedback :state="!($v.password.$error)">
                  Uma senha com 6 dígitos é obrigatória.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="10">
              <b-form-group label="Confirmar senha:" label-for="repeatPassword">
                <b-form-input id="repeatPassword" v-model.trim="$v.repeatPassword.$model"
                  :state="!($v.repeatPassword.$error)" type="password" placeholder="********" required></b-form-input>
                <b-form-invalid-feedback :state="!($v.repeatPassword.$error)">
                  A confirmação da senha é obrigatório e precisa ser igual a senha.
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="10" >
              <div class="mb-2 p-0 mt-2">
                <DefaultButton :buttonText="'Cadastrar'" :loading="loading"></DefaultButton>
              </div>
              <div>
                <p>Já possui conta? <a href="/login">Login</a></p>
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
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import ToastMixin from '@/mixins/toastMixin.js';

export default {
  name: 'Registration',
  mixins: [ToastMixin],
  components: {
    DefaultButton
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      loading: false
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLengthValue: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()

      if (this.$v.$invalid) return;

      const credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }
      this.loading = true
      this.$store.dispatch('registration', credentials)
        .then((message) => {
          this.makeToast(message, 'Tudo certo!', 'success');
          setTimeout(() => {
            this.$router.push('/login');
          }, 4000)
        }).catch(error => {
          this.makeToast(error, 'Mensagem de Erro!', 'warning')
        }).finally(() => {
          this.loading = false
        })
    },
  }
}
</script>

<style scoped>
.container-wrap {
  background: url('../../assets/backgroud.svg');
}

.container-left {
  background: url('../../assets/registration-image.svg');
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
  .h-sm-87 {
    height: 87% !important;
  }
}
</style>