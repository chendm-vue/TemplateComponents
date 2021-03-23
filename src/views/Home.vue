<template>
  <div class="flex h-full">
    <base-menu :data="data" class="w-60" />
    <div class="flex-1 flex flex-col bg-gray-200">
      <sys-header />
      <div class="flex-1 h-0"><router-view /></div>
    </div>
  </div>
</template>

<script>
import BaseMenu from '@/baseComponents/BaseMenu'
import data from '@/api/menuData'
import SysHeader from '@/components/SysHeader'

export default {
  name: 'Home',
  components: { SysHeader, BaseMenu },
  data () {
    return {
      data
    }
  }
}
</script>
