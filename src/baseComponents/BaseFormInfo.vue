<template>
  <div>
    <base-form :value="info" label-width="100px" layout="KEEPPACEWITH" :json="json" review></base-form>
  </div>
</template>

<script>
import BaseForm from './BaseForm'

/**
 * 基础的BaseForm详情组件
 */
export default {
  name: 'BaseFormInfo',
  components: { BaseForm },
  props: {
    // 从接口详情中得到的数据
    info: Object,
    // 渲染页面的描述文件
    json: Object
  }
}
</script>

<style scoped></style>
