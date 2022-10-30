<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { PropType } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: Object as PropType<IconDefinition | [IconDefinition, boolean][]>
  },
  render () {
    if (this.name) {
      if (Array.isArray(this.name)) {
        const iconToRender = this.name.find(([, key]) => key)
        return h('div', [iconToRender ? h(FontAwesomeIcon, { icon: iconToRender[0] }) : null])
      } else {
        return h('div', [h(FontAwesomeIcon, { icon: this.name })])
      }
    } else {
      return h('div')
    }
  }
})
</script>
