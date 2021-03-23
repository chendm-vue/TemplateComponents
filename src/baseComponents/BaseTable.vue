<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 h-0">
      <el-table v-bind="$attrs" height="100%" border ref="table" @selection-change="handleSelectionChange">
        <el-table-column v-for="(column, index) in columns" :label="column.label" :prop="column.prop" :key="index"
                         :width="column.width" :sortable="column.sortable" :type="column.type"
        >
          <template #default="scope" v-if="!column.type">
            <table-render v-if="column.render" :row="scope.row" :render="column.render"
            ></table-render>
            <div v-else-if="column.operate">
              <el-button type="text" @click="update(scope.row)">修改</el-button>
              <el-button type="text" @click="del(scope.row)">删除</el-button>
            </div>
            <span v-else>{{ scope.row[column.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex flex-row-reverse">
      <el-pagination background class="flex-shrink-0" v-bind="Pagination" v-if="Pagination"
                     @current-change="currentChange" @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import TableRender from './table'

export default {
  inheritAttrs: false,
  name: 'BaseTable',
  components: { TableRender },
  props: {
    Pagination: Object,
    columns: Array
  },
  methods: {
    update (row) {
      this.$emit('edit', row)
    },
    del (row) {
      this.$emit('del', row)
    },
    currentChange (row) {
      this.$emit('update:pageNum', row)
      this.$emit('query', true)
    },
    sizeChange (row) {
      this.$emit('update:pageSize', row)
      this.$emit('query', true)
    },
    handleSelectionChange (val) {
      this.$emit('selection', val)
    }
  }
}
</script>
