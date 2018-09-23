<template>
  <div id="app">
    <h2>Find location coordinates by address input </h2>
    <img alt="Vue logo" src="./assets/logo.png">
    <Address msg="Welcome to Addres Vue.js App"/>
  </div>
</template>

<script>
import Address from './components/Address.vue'

export default {
  name: 'app',
  components: {
    Address
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15%;

}

</style>
