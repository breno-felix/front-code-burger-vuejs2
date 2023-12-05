<template>
  <b-navbar toggleable="sm" class="navbar-wrapper">
    <b-navbar-brand href="#">
      <b-img :src="require('../assets/logo.svg')" alt="logo image" class="img-brand"></b-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/" :active="$route.name === 'home'">
          <p class="m-0">Home</p>
        </b-nav-item>
        <b-nav-item href="/products" :active="$route.name === 'products'">
          <p class="m-0">Ver produtos</p>
        </b-nav-item>
        <div class="d-sm-none">
          <b-nav-item href="/cart" :active="$route.name === 'cart'">
            <p class="m-0">Carrinho</p>
          </b-nav-item>
          <b-nav-item href="#">
            <p class="m-0" @click="logout">Sair</p>
          </b-nav-item>
        </div>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto d-none d-sm-flex">
        <b-nav-item href="/cart">
          <b-img :src="require('../assets/cart.svg')" alt="cart image"></b-img>
        </b-nav-item>
        <div class="line"></div>
        <b-nav-item href="#">
          <b-img :src="require('../assets/person.svg')" alt="person image"></b-img>
        </b-nav-item>
        <div class="ml-2">
          <p class="m-0 name">Olá, Breno</p>
          <a href="#" class="logout-button" @click="logout" >Sair</a>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.go();
    }
  }
};
</script>

<style scoped>
.navbar-wrapper {
  background-color: #FFFFFF;
  box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.15);
}

.img-brand {
  height: 50px;
}

.nav-link {
  color: #555;
  font-size: 16px;
  font-weight: 400;
}

.active {
  color: #9758A6 !important;
  font-weight: 700;
}

.line {
  height: 40px;
  border: 0.5px solid #bababa;
}

.logout-button {
  color: #9758A6;
  font-size: 14px;
  font-weight: 700;
}

.name {
  color: #555;
  font-size: 14px;
  font-weight: 300;
}
</style>