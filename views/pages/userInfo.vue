<template>
  <div>用户信息：
    {{JSON.stringify(userInfo)}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.$http.get('/oauth/user/userInfo').then((data) => {
      this.userInfo = data
    })
  }
}
</script>

