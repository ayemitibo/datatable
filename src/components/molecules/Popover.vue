
<template>
  <div :data-uid="uid">
    <div ref="activator" class="inline-block" @click="toggle">
      <slot name="activator" />
    </div>

    <transition name="fade">
      <div v-show="shown" ref="body" class="popover-body" data-test="body">
        <slot :toggle="toggle" :hide="hide" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  PropType,
  watch,
  getCurrentInstance,
} from 'vue'
import {
  createPopper,
  Instance as PopperInstance,
  Placement,
} from '@popperjs/core'

export default defineComponent({
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
  },
  emits: ['shown', 'hidden'],
  setup(props, { emit }) {
    const activator = ref<HTMLElement>()
    const body = ref<HTMLElement>()
    const shown = ref(false)
    const uid = getCurrentInstance()?.uid

    const offsetModifier = {
      name: 'offset',
      options: {
        offset: [props.offsetX, props.offsetY],
      },
    }

    let popper: PopperInstance

    const toggle = () => {
      shown.value = !shown.value
      popper.setOptions({
        modifiers: [
          { name: 'eventListeners', enabled: shown.value },
          offsetModifier,
        ],
      })
      popper.update()
    }

    const hide = () => {
      shown.value = false
      popper.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: false }, offsetModifier],
      })
      popper.update()
    }

    const hideWhenClickAway = (e: MouseEvent) => {
      const closestElement = (e.target as HTMLElement).closest(
        `[data-uid="${uid}"]`
      )

      if (!closestElement) {
        hide()
      }
    }

    onMounted(() => {
      popper = createPopper(
        activator.value as HTMLElement,
        body.value as HTMLElement,
        {
          placement: props.placement,
          modifiers: [offsetModifier],
        }
      )

      document.addEventListener('click', hideWhenClickAway)
    })

    onBeforeUnmount(() => {
      popper.destroy()
      document.removeEventListener('click', hideWhenClickAway)
    })

    watch(shown, (val) => {
      if (val) {
        emit('shown')
      } else {
        emit('hidden')
      }
    })

    return { activator, body, shown, toggle, hide, uid }
  },
})
</script>

<style lang="postcss">
.popover-body {
  & *::-webkit-scrollbar {
    width: 6px;
  }

  & *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
  }

  & *:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgb(221, 221, 221);
      &:hover {
        background-color: #999;
      }
    }
  }
}
</style>

<style lang="postcss" scoped>
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-150;
}
</style>
