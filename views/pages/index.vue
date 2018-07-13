<template>
  <div class="home">
    <div class="home_title">
      <myheader></myheader>
    </div>
    <div class="home_body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import myheader from '../components/header'

export default {
  components: {
    myheader
  },
  mounted () {
    if (!this.$store.state.user.user_name) {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.home{
  position: relative;
  height: 100%;
}

.home_title{
  height: 50px;
}

.home_body{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
