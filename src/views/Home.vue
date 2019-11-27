<template>
  <div class="home">
    <el-page-header @back="goBack" content="详情页面">
</el-page-header>
  </div>
</template>

<script>
  export default {
    name: 'home',
  components: {

  },
    methods: {
      goBack() {
        console.log('go back');
      }
    }
  }
</script>
