<template>
  <Popover
    ref="popover"
    @shown="onShown"
  >
    <template #activator>
      <slot />
    </template>

    <template #default="{ hide }">
      <form
        class="w-96 px-4 py-4 bg-white rounded-sm"
        @submit.prevent
      >
        <div class="flex flex-col">
          <Checkbox
            v-for="{ text, value } in columns"
            :key="value"
            v-model="selectedColumns"
            :value="value"
            :label="text"
            class="text-sm py-2 border-b"
          />
        </div>
        <div class="grid grid-cols-3 gap-3 mt-3">
          <Button
            class="action-button"
            type="submit"
            @click="save"
          >
            Save
          </Button>
          <Button
            class="action-button"
            @click="hide"
          >
            Cancel
          </Button>
          <Button
            class="action-button"
            @click="reset"
          >
            Reset
          </Button>
        </div>
      </form>
    </template>
  </Popover>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import Popover from '/@src/components/molecules/Popover.vue'
import Checkbox from '/@src/components/atoms/Checkbox.vue'
import Button from '/@src/components/atoms/Button.vue'


export default defineComponent({
  components: {
    Popover,
    Checkbox,
    Button,
  },
  props: {
    columns: {
      type: Array as PropType<{ text: string, value: string }[]>,
      required: true,
    },
  },
  emits: ['filter-columns'],
  setup(_, { emit }) {
    const popover = ref<ReturnType<typeof defineComponent>>()
    let lastSelectedColumns: string[] = []
    const selectedColumns = ref<string[]>([])

    const onShown = () => {
      selectedColumns.value = lastSelectedColumns.slice()
    }

    const save = () => {
      emit('filter-columns', selectedColumns.value)
      lastSelectedColumns = selectedColumns.value.slice()
      popover.value?.hide()
    }

    const reset = () => {
      selectedColumns.value.length = 0
      save()
      popover.value?.hide()
    }

    return { popover, onShown, selectedColumns, reset, save }
  },
})
</script>

<style lang="postcss" scoped>
.action-button {
  @apply bg-findox-blue text-white;
}
</style>
