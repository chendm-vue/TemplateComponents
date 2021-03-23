<template>
  <div class="flex flex-col h-full relative" style="padding: 20px;">
    <div class="bg-white p-3 search-form shadow">
      <base-form v-model="searchForm" ref="searchForm" inline :json="searchJson">
        <!--        <slot name="searchForm" :searchForm="searchForm"></slot>-->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">
            搜索
          </el-button>
          <el-button type="default" icon="el-icon-refresh-right" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </base-form>
    </div>
    <div class="flex flex-1 h-0">
      <div class="mt-4">
        <slot name="left"></slot>
      </div>
      <div class="flex flex-col flex-1 bg-white mt-4 shadow">
        <div class="p-3">
          <el-button type="primary" icon="el-icon-plus" @click="add">
            添加
          </el-button>
          <slot name="btns"></slot>
        </div>
        <div class="flex-1 h-0 flex">
          <base-table class="flex-1" :columns="columns" :data="data" :page-num.sync="pageNum" :page-size.sync="pageSize"
                      @query="query" v-loading="loading" :Pagination="{
            total,
            pageSize,
            pageNum,
            layout: 'total, sizes, prev, pager, next, jumper'
          }" @edit="update" @del="del" ref="table" @selection="selection = $event"
          />
        </div>
      </div>
    </div>
    <transition :duration="500" name="el-zoom-in-center">
      <div class="absolute top-0 bottom-0 left-0 right-0 bg-white z-50" v-show="visible" style="margin: 20px;"
      >
        <div class="relative flex flex-col h-full">
          <el-page-header @back="goBack" :content="contentTitle" class="p-4 border-b border-gray-200"></el-page-header>
          <div class="p-4 overflow-auto">
            <base-form v-model="form" ref="form" label-width="100px" :json="addJson" layout="KEEPPACEWITH"></base-form>
          </div>
          <div class="absolute right-3 top-3">
            <el-button type="default" @click="goBack">取消</el-button>
            <el-button type="primary" @click="submit" :loading="btnLoading">确定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/deep/ .search-form .el-form-item {
  @apply mb-0;
}
</style>

<script>

import BaseForm from '@/baseComponents/BaseForm'
import BaseTable from '@/baseComponents/BaseTable'
export default {
  name: 'BaseCrud',
  components: { BaseTable, BaseForm },
  props: {
    /**
     * 新增接口
     */
    saveInterface: Function,
    /**
     * 修改接口
     */
    updateInterface: Function,
    /**
     * 查询接口
     */
    queryInterface: Function,
    /**
     * 删除接口
     */
    delInterface: Function,
    /**
     * 查看详情接口
     */
    infoInterface: Function,
    /**
     * 列表格式
     */
    columns: Array,
    /**
     * 弹窗标题
     */
    contentTitle: {
      type: String,
      default: '详情'
    },
    /**
     * 新增表单JSON
     */
    addJson: Array,
    /**
     * 搜索表单JSON
     */
    searchJson: Array,
    /**
     * CRUD 主键
     */
    primaryKey: String,
    /**
     * CRUD 主键name
     */
    primaryName: String,
    /**
     * 提交完成后的回调函数
     */
    submitCallBack: Function,
    /**
     * 执行CRDU重置之后，将会执行此函数
     */
    resetCallBack: Function,
    /**
     * 新增时的回调函数
     */
    addCallBack: Function
  },
  data () {
    return {
      searchForm: {},
      visible: false,
      form: {},
      data: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      loading: false,
      btnLoading: false,
      selection: []
    }
  },
  created () {
    this.query()
  },
  watch: {
    visible (val) {
      if (!val) {
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    goBack () {
      this.visible = false
    },
    reset () {
      this.$refs.searchForm.reset()
      this.query()
      this.resetCallBack && this.resetCallBack(this)
    },
    query () {
      this.loading = true
      this.queryInterface({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...this.searchForm
      }).then(res => {
        this.data = res.data.list
        this.total = res.data.totalCount
      }).finally(() => {
        this.loading = false
      })
    },
    search () {
      this.pageNum = 1
      this.query()
    },
    add () {
      this.visible = true
      this.addCallBack && this.addCallBack(this)
    },
    update (row) {
      if (this.infoInterface) {
        this.infoInterface(row[this.primaryKey]).then(res => {
          this.visible = true
          this.form = res.data
        })
      }
    },
    del (row) {
      const msg = this.primaryName ? `确定删除【${row[this.primaryName]}】?` : '确定删除此项?'
      this.$confirm(msg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delInterface([row[this.primaryKey]]).then(() => {
          this.$message.success('删除成功!')
          this.query()
        })
      }).catch(() => {
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true
          const method = this.form[this.primaryKey] ? this.updateInterface : this.saveInterface
          method(this.form).then(() => {
            this.$message.success('成功')
            if (this.submitCallBack) {
              this.submitCallBack()
            } else {
              this.visible = false
              this.pageNum = 1
              this.query()
            }
          }).finally(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
