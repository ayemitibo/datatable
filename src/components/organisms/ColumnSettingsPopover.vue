<template>
  <Popover ref="popover">
    <template #activator>
      <slot />
    </template>

    <template #default="{ hide }">
      <div class="w-[300px] px-4 py-4 bg-white rounded-sm">
        <h2 class="text-center text-black font-bold capitalize">
          {{ column.text }}
        </h2>

        <div
          class="
            flex flex-col
            items-start
            text-findox-blue
            space-y-3
            mt-5
            pb-5
            border-b
          "
        >
          <button @click="sortAsc">Sort A to Z</button>
          <button @click="sortDesc">Sort Z to A</button>
        </div>

        <form class="mt-3" @submit.prevent>
          <div>
            <input
              v-model="filterText"
              class="w-full text-xs p-1 border rounded-none"
              type="search"
              :placeholder="`Filter ${column.text}`"
            />
          </div>
          <div class="flex flex-col pb-8 border-b max-h-80 overflow-auto">
            <Checkbox
              v-for="val in filteredColumnValues"
              :key="val"
              v-model="selectedValues"
              :value="val"
              :label="val"
              class="text-xs py-1"
              @update:modelValue="filter"
            />
          </div>

          <div class="flex justify-between mt-3">
            <Button
              class="bg-yellow-500 text-white text-xs"
              type="submit"
              @click="clearFilter"
            >
              Clear Filter
            </Button>

            <Button class="border text-black text-xs" @click="hide">
              Close
            </Button>
          </div>
        </form>
      </div>
    </template>
  </Popover>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { isDef, isArray, isDate } from '/@src/utils'
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
    column: {
      type: Object as PropType<{ text: string; value: string }>,
      required: true,
    },
    items: {
      type: Array as PropType<Record<string, any>[]>,
      required: true,
    },
  },
  emits: ['sort', 'filter'],
  setup(props, { emit }) {
    const popover = ref<ReturnType<typeof defineComponent>>()
    const filterText = ref('')
    const selectedValues = ref([])

    const columnValues = computed(() => {
      const columnValuesSet: Set<string> = new Set()

      props.items.forEach((item) => {
        const val = item[props.column.value]

        if (!isDef(val)) {
          return
        }

        if (isArray(val)) {
          columnValuesSet.add(val.join(', '))
        } else if (isDate(val)) {
          columnValuesSet.add(val.toLocaleDateString())
        } else {
          columnValuesSet.add(val.toString())
        }
      })

      return Array.from(columnValuesSet)
    })

    const filteredColumnValues = computed(() => {
      return columnValues.value.filter((v) =>
        v.toString().toLowerCase().includes(filterText.value.toLowerCase())
      )
    })

    const createSorter = (desc: boolean) => () => {
      emit('sort', {
        column: props.column.value,
        desc,
      })

      popover.value?.hide()
    }

    const sortDesc = createSorter(true)
    const sortAsc = createSorter(false)

    const filter = () => {
      emit('filter', {
        column: props.column.value,
        values: selectedValues.value,
      })
    }

    const clearFilter = () => {
      selectedValues.value = []
      filter()
      popover.value?.hide()
    }

    return {
      popover,
      filterText,
      selectedValues,
      filteredColumnValues,
      sortAsc,
      sortDesc,
      filter,
      clearFilter,
    }
  },
})
</script>

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
