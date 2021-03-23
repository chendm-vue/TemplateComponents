<template>
  <el-form ref="form" v-bind="$attrs" :model="value" :rules="defaultRules" :validateOnRuleChange="false"
  >
    <template v-if="!layout">
      <template v-for="(item,index) in json">
        <component :is="review ? 'base-form-item-info': 'base-form-item'" :item="item" :value="value" :key="index"
        ></component>
      </template>
    </template>
    <template v-if="layout">
      <el-row v-for="(v,i) in json" :key="i">
        <el-col :span="item.span || span || 8"
                :offset="typeof item.offset === 'undefined' ? (offset || 2) : item.offset" v-for="(item, index) in v"
                :key="index"
        >
          <component :is="review ? 'base-form-item-info': 'base-form-item'" :item="item" :value="value" :key="index"
          ></component>
        </el-col>
      </el-row>
    </template>
    <slot></slot>
  </el-form>
</template>

<script>
import validator from './validator'
import Custom from './table/index'
import BaseFormItem from './BaseFormItem'
import BaseFormItemInfo from './BaseFormItemInfo'

/**
 * Basic Form Components
 */
export default {
  components: { BaseFormItem, Custom, BaseFormItemInfo },
  inheritAttrs: false,
  props: {
    value: Object,
    json: Array,
    layout: {
      type: Boolean,
      default: false
    },
    span: Number,
    offset: Number,
    // 是否预览
    review: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultRules: {}, // Default configuration made by interception
      validateList: [],
      arr: [],
      firstValue: null
    }
  },
  async created () {
    // 读取规则列表
    this.readRuleList()

    const arr = {}
    this.json.flat().forEach(v => {
      if (v.prop === 'undefined' || !v.prop) return
      if (v.init) {
        arr[v.prop] = v.init
      } else {
        arr[v.prop] = ''
      }
    })

    const unwatch = this.$watch('value', function (val) {
      this.resetRules(this.json.flat())
      unwatch()
      this.firstValue = this.beggarVersionDeepCopy(val)
    })

    this.$emit('input', arr)
  },
  methods: {
    validate (fn) {
      return this.$refs.form.validate(fn)
    },
    reset () {
      this.$refs.form.clearValidate()
      this.$emit('input', this.beggarVersionDeepCopy(this.firstValue))
    },
    readRuleList () {
      this.validateList = Object.keys(require('./validator/index').default)
    },
    resetRules (formItemPropsList) {
      formItemPropsList.forEach(v => {
        if (v.validate === 'c-required') {
          if (!this.defaultRules[v.prop]) {
            this.$set(this.defaultRules, v.prop, [])
          }
          this.defaultRules[v.prop].push({
            required: true,
            message: `${v.label}不能为空`,
            trigger: 'blur'
          })
        }

        this.validateList.forEach(val => {
          if (v.validate === val) {
            if (!this.defaultRules[v.prop]) {
              this.$set(this.defaultRules, v.prop, [])
            }
            this.defaultRules[v.prop].push({
              validator: validator[val](this),
              trigger: 'blur'
            })
          }
        })
      })
    },
    setModelProperty (formItemPropsList) {
      return new Promise(resolve => {
        const jsonForm = { _uid: 'c2I=' }
        formItemPropsList
          .filter(v => v.prop)
          .forEach(v => {
            jsonForm[v.prop] = v.type === 'bool' ? false : ''
          })

        this.$emit('input', jsonForm)
        resolve()
      })
    },
    beggarVersionDeepCopy (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
