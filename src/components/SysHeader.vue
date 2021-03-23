<template>
  <div class="header p-3 pb-0 shadow-md bg-white flex flex-col">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <i class="cdmfont cdmcaidan cursor-pointer mr-6"></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <i
          class="cdmfont cursor-pointer"
          :class="{ cdmquanping: !fullScreen, cdmtuichuquanping: fullScreen }"
          @click="toggleScreen"
        ></i>
      </div>
    </div>
    <sys-tabs />
  </div>
</template>

<script>
import SysTabs from '@/components/SysTabs'

export default {
  name: 'SysHeader',
  components: { SysTabs },
  data () {
    return {
      fullScreen: false
    }
  },
  methods: {
    toggleScreen () {
      if (this.fullScreen) {
        document.exitFullscreen().then(() => {
          this.fullScreen = false
        })
      } else {
        document.body.requestFullscreen().then(() => {
          this.fullScreen = true
        })
      }
    }
  }
}
</script>
