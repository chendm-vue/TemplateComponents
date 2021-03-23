<template>
  <el-form-item :prop="item.prop" :label="item.label" v-bind="{[item.validate]: true}">
    <el-input v-if="item.type === 'input'" v-model="value[item.prop]" clearable v-bind="item.attrs"></el-input>
    <el-input-number v-else-if="item.type === 'number'" :min="1" v-model="value[item.prop]" clearable
                     v-bind="item.attrs"
    ></el-input-number>
    <el-date-picker v-else-if="item.type ==='date'" v-model="value[item.prop]" type="date" value-format="yyyy-MM-dd"
                    placeholder="选择日期"
    ></el-date-picker>
    <custom :render="item.render" :row="value" v-else-if="item.render" />
    <el-input v-else v-model="value[item.prop]" clearable v-bind="item.attrs"></el-input>
  </el-form-item>
</template>

<script>
import Custom from './table/index'

export default {
  name: 'BaseFormItem',
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

<style scoped></style>
