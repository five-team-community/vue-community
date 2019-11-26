<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
       <router-view/>
  </div>
</template>

<script>


export default {
  name: 'home',
  components: {

  }
}
</script>
