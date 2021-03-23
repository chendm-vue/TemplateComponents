<template>
  <div class="base-popup">
    <el-dialog ref="dialog" :append-to-body="true" v-bind="$attrs" :visible.sync="show" width="30%" top="0"
               :close-on-click-modal="false"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="footer">
        <el-button type="primary" @click="submitFunc" :loading="buttonLoading">
          确定
        </el-button>
        <el-button @click="closeModal">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 基础弹窗组件
 */
export default {
  name: 'BasePopup',
  inheritAttrs: false,
  props: {
    // Is visible
    value: Boolean,
    draggable: Boolean,
    submit: Function,
    footer: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启边缘检测
     */
    edgeDetection: Boolean
  },
  data () {
    return {
      initX: 0,
      initY: 0,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      allowDrag: true,
      instance: null,
      maxGap: 20,
      buttonLoading: false
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$nextTick(() => {
          // Center display
          const dom = this.instance || this.getInstance()
          this.instance = dom
          const height = dom.offsetHeight
          const width = dom.offsetWidth
          const parentWrapper = dom.closest('.el-dialog__wrapper')
          const parentHeight = parentWrapper.offsetHeight
          const parentWidth = parentWrapper.offsetWidth
          this.initX = (parentWidth - width) / 2
          this.initY = (parentHeight - height) / 2
          if (this.initY < this.maxGap) {
            this.initY = this.maxGap
            const headerHeight = dom.querySelector('.el-dialog__header')
              .offsetHeight
            const footerHeight = dom.querySelector('.el-dialog__footer')
              .offsetHeight
            document.querySelector(
              '.el-dialog__body'
            ).style.height = `${parentHeight -
            headerHeight -
            footerHeight -
            2 * this.maxGap -
            60}px`
            document.querySelector('.el-dialog__body').style.overflow = 'auto'
          }
          dom.style.top = `${this.initY}px`
          dom.style.left = `${this.initX}px`
        })
      }
    }
  },
  beforeDestroy () {
    if (this.draggable) {
      document.removeEventListener('mousedown', this.handleMousedown)
      document.removeEventListener('mousemove', this.handleMousemove)
      document.removeEventListener('mouseup', this.handleMouseup)
    }
  },
  mounted () {
    const dom = this.getInstance()
    dom.style.position = 'absolute'
    dom.style.margin = '0'
    dom.style.padding = '0'
    if (this.draggable) {
      dom.querySelector('.el-dialog__header').style.cursor = 'move'
      dom.querySelector('.el-dialog__header').style.userSelect = 'none'
      document.addEventListener('mousedown', this.handleMousedown)
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
    }
  },
  methods: {
    getInstance () {
      return this.$refs.dialog.$el.querySelector('.el-dialog')
    },
    handleInstancePosition (top, left) {
      let dom
      if (this.instance) {
        dom = this.instance
      } else {
        dom = this.getInstance()
        this.instance = dom
      }
      dom.style.top = `${top}px`
      dom.style.left = `${left}px`
    },
    handleMousedown (e) {
      if (this.allowDrag && e.target.closest('.el-dialog__header')) {
        this.allowDrag = false
        this.startX = e.pageX
        this.startY = e.pageY
      }
    },
    handleMousemove (e) {
      if (!this.allowDrag) {
        const x = e.pageX
        const y = e.pageY
        this.handleInstancePosition(
          this.initY + y - this.startY,
          this.initX + x - this.startX
        )
      }
    },
    handleMouseup () {
      if (this.instance && !this.allowDrag) {
        this.allowDrag = true
        this.initX = parseInt(this.instance.style.left, 10)

        this.initY = parseInt(this.instance.style.top, 10)
      }
    },
    submitFunc () {
      this.buttonLoading = true
      this.submit && this.submit(() => {
        this.buttonLoading = false
        this.show = false
      })
    },
    closeModal () {
      this.show = false
    }
  }
}
</script>

<style scoped>
/deep/ .el-button {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
</style>
