<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
@import "//at.alicdn.com/t/font_2333809_79imudaymij.css";
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  watch: {
    ajaxError (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (val) {
          this.$notify({
            title: '提示',
            message: this.ajaxContent.message,
            type: 'error'
          })
          this.setAjaxError(false)
        }
        this.$once('hook:beforeDestroy', () => {
          clearTimeout(this.timer)
        })
      }, 500)
    }
  },
  computed: {
    ...mapGetters('event', ['ajaxError', 'ajaxContent'])
  },
  methods: {
    ...mapMutations('event', ['setAjaxError'])
  }
}
</script>
