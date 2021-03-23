<template>
  <el-form-item :prop="item.prop" :label="item.label" v-bind="{[item.validate]: true}">
    <custom :render="item.render" :row="value" v-if="item.render" />
    <div v-else-if="item.type === 'file'" v-for="(item,index) in value[item.prop]" :key="index">
      <a :href="item.url" class="download-url" target="_blank">{{ item.name }}</a>
    </div>
    <span v-else>{{ value[item.prop] }}</span>
  </el-form-item>
</template>

<script>
import Custom from './table/index'

export default {
  name: 'BaseFormItemInfo',
  components: { Custom },
  props: {
    /**
     * 类似这种数据
     * { prop: 'entryTime', label: '入职日期', type: 'date', render: () => {} }
     */
    item: Object,
    value: Object
  }
}
</script>

<style scoped>
.download-url {
  text-decoration: underline;
  color: #1890ff;
}
</style>
