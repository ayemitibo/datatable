<template>
  <label
    class="text-sm"
    :class="{ checked: isChecked }"
  >
    <input
      class="sr-only"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    >
    <span class="flex items-center">
      <span class="checkmark" />
      <span class="ml-1">{{ label }}</span>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { isArray } from '/@src/utils'

export default defineComponent({
  props: {
    label: { type: String, required: true },
    modelValue: { type: [Boolean, Array], default: false },
    value: { type: String },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isChecked = computed(() => {
      if (isArray(props.modelValue)) {
        return props.modelValue.includes(props.value)
      } else {
        return props.modelValue
      }
    })

    const updateInput = (e: Event) => {
      if (isArray(props.modelValue)) {
        const isChecked = (e.target as HTMLInputElement).checked

        const newVal = [...props.modelValue]

        if (isChecked) {
          newVal.push(props.value)
        } else {
          const index = newVal.indexOf(props.value)
          newVal.splice(index, 1)
        }

        emit('update:modelValue', newVal)
      } else {
        emit('update:modelValue', !props.modelValue)
      }
    }

    return { isChecked, updateInput }
  },
})
</script>

<style lang="postcss" scoped>
label {
  & .checkmark {
    @apply flex-shrink-0 flex justify-center items-center border rounded-sm cursor-pointer;
    width: 14px;
    height: 14px;
  }

  &.checked .checkmark {
    @apply bg-findox-blue border-none;

    &::before {
      @apply border-white transform rotate-45;
      content: '';
      width: 5px;
      height: 8px;
      border-width: 0 2px 2px 0;
    }
  }
}
</style>
