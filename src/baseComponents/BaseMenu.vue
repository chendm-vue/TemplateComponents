<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <base-menu-item v-for="(item, index) in data" :key="index" :data="item" />
  </el-menu>
</template>
<script>
import BaseMenuItem from './BaseMenuItem'

export default {
  name: 'BaseMenu',
  components: { BaseMenuItem },
  props: {
    data: Array
  }
}
</script>
