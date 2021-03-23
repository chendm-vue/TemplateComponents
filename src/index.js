import BaseForm from '@/baseComponents/BaseForm'
import BaseFormInfo from '@/baseComponents/BaseFormInfo'
import BaseFormItem from '@/baseComponents/BaseFormItem'
import BaseFormItemInfo from '@/baseComponents/BaseFormItemInfo'
import BaseMenu from '@/baseComponents/BaseMenu'
import BaseMenuItem from '@/baseComponents/BaseMenuItem'
import BasePopup from '@/baseComponents/BasePopup'
import BasePopupTablePicker from '@/baseComponents/BasePopupTablePicker'
import BaseTable from '@/baseComponents/BaseTable'

const components = [
  BaseForm,
  BaseFormInfo,
  BaseFormItem,
  BaseFormItemInfo,
  BaseMenu,
  BaseMenuItem,
  BasePopup,
  BasePopupTablePicker,
  BaseTable
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  author: 'chendm',
  install
}
