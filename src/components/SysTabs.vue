<template>
  <div class="SysTabs pt-3">
    <el-tabs v-model="value" type="card" closable>
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SysTabs',
  data () {
    return {
      tabs: [
        {
          title: '首页',
          name: '/',
          closable: false
        }
      ],
      value: '/'
    }
  }
}
</script>
