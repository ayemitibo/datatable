<template>
  <div>
    <div
      role="table"
      class="text-xs"
      :aria-label="label"
      :aria-rowcount="data.length"
    >
      <div role="rowgroup">
        <div class="grid-header" role="row">
          <ColumnSettingsPopover
            v-for="column in columns"
            :key="column.value"
            class="flex-1"
            :column="column"
            :items="data"
            @sort="onSort"
            @filter="onFilter"
            v-show="isLargeScreen || column.text.priority"
          >
            <button
              class="grid-cell capitalize"
              role="columnheader"
              :aria-sort="
                sortBy === column.value
                  ? sortDesc
                    ? 'descending'
                    : 'ascending'
                  : 'none'
              "
            >
              {{ column.text.title || column.text }}
            </button>
          </ColumnSettingsPopover>
        </div>
      </div>

      <!-- <div class="grid-subheader-row text-sm pl-1"></div> -->

      <div role="rowgroup">
        <div
          v-for="row in rows"
          :key="row[itemKey]"
          class="grid-row"
          :class="{
            '!bg-findox-blue text-white': selectedRowIdsSet.has(row[itemKey]),
          }"
          role="row"
          @click="toggleRow(row)"
        >
          <span
            v-for="column in columns"
            :key="column.value"
            class="grid-cell flex-1 truncate"
            role="cell"
            v-show="isLargeScreen || column.text.priority"
          >
            <slot
              :name="column.value"
              :row="row"
              :column="column"
              :isSelectedRow="selectedRowIdsSet.has(row[itemKey])"
              :value="row[column.value]"
            >
              {{ row[column.value] ?? "(blank)" }}
            </slot>
          </span>
        </div>
      </div>
    </div>

    <div
      v-show="totalPages && !hasAppliedFilters"
      class="flex justify-center items-center py-3"
    >
      <button
        :disabled="!hasPrev"
        :class="{ 'pointer-events-none': !hasPrev, 'opacity-50': !hasPrev }"
        @click="$emit('prev')"
      >
        <IconChevronDoubleLeft
          class="text-findox-blue w-6 h-6"
          width="24"
          height="24"
        />
      </button>
      <span class="text-sm mx-3">page {{ page }} of {{ totalPages }}</span>
      <button
        :disabled="!hasNext"
        :class="{ 'pointer-events-none': !hasNext, 'opacity-50': !hasNext }"
        @click="$emit('next')"
      >
        <IconChevronDoubleRight
          class="text-findox-blue w-6 h-6"
          width="24"
          height="24"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { isArray, isDate, saveJsonAsXlsx } from "/@src/utils";
import FilterColumnsPopover from "./FilterColumnsPopover.vue";
import ColumnSettingsPopover from "./ColumnSettingsPopover.vue";
import Button from "/@src/components/atoms/Button.vue";
import IconCog from "/@src/assets/icons/cog.svg?component";
import IconPersonAdd from "/@src/assets/icons/person-add.svg?component";
import IconExport from "/@src/assets/icons/export.svg?component";
import IconChevronDoubleRight from "/@src/assets/icons/chevron-double-right.svg?component";
import IconChevronDoubleLeft from "/@src/assets/icons/chevron-double-left.svg?component";
import { useMediaQuery } from "@vueuse/core";

export default defineComponent({
  components: {
    FilterColumnsPopover,
    ColumnSettingsPopover,
    Button,
    IconCog,
    IconPersonAdd,
    IconExport,
    IconChevronDoubleRight,
    IconChevronDoubleLeft,
  },
  props: {
    label: { type: String, default: "" },
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    itemKey: { type: String, default: "id" },
    exportFileName: { type: String, default: "findox-sheet" },
    exportWorksheetName: { type: String, default: "Worksheet" },
    page: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
    options: {
      type: Object,
    },
  },
  emits: ["prev", "next"],
  setup(props) {
    const sortBy = ref("");
    const sortDesc = ref(true);
    const filterBy = ref<Record<string, Set<string>>>({});
    const selectedColumns = ref(new Set());
    const selectedRows: Record<string, any>[] = [];
    const selectedRowIdsSet = ref(new Set()); // using this for quick lookups to highlight selected rows

    const isLargeScreen = useMediaQuery("(min-width: 1024px)");

    const hasAppliedFilters = computed(
      () => !!Object.keys(filterBy.value).length
    );
    const hasPrev = computed(() => props.page > 1);
    const hasNext = computed(() => props.page < props.totalPages);

    let mappedHeaders: string[] = [];

    mappedHeaders = Object.keys(props.options?.headings);

    let headers = mappedHeaders.map((item) => {
      return { value: item, text: props.options?.headings[item] };
    });

    const columns = computed(() => {
      if (selectedColumns.value.size) {
        return headers.filter((header) =>
          selectedColumns.value.has(header.value)
        );
      }
      return headers;
    });

    const rows = computed(() => {
      let result = props.data.slice();

      const filteredColumns = Object.keys(filterBy.value);

      if (filteredColumns.length) {
        result = result.filter((row) => {
          return filteredColumns.every((column) => {
            let val = row[column];
            val = isDate(val) ? val.toLocaleDateString() : val.toString();
            return filterBy.value[column].has(val);
          });
        });
      }

      if (sortBy.value) {
        result.sort((r1, r2) => {
          let a = r1[sortBy.value];
          let b = r2[sortBy.value];

          a =
            a instanceof Date
              ? a.getTime()
              : typeof a === "string"
              ? a.toLowerCase()
              : a;

          b =
            b instanceof Date
              ? b.getTime()
              : typeof b === "string"
              ? b.toLowerCase()
              : b;

          if (sortDesc.value) {
            return b < a ? -1 : b > a ? 1 : 0;
          } else {
            return a < b ? -1 : a > b ? 1 : 0;
          }
        });
      }

      // concat arrays and convert dates to locale date strings
      result = result.map((row) => {
        const ob: Record<string, string> = {};

        Object.keys(row).forEach((key) => {
          const col = row[key];
          if (isArray(col)) {
            ob[key] = col.join(", ");
          } else if (isDate(col)) {
            ob[key] = col.toLocaleDateString();
          }
        });

        return { ...row, ...ob } as Record<string, string | number>;
      });

      return result;
    });

    const toggleRow = (row: Record<string, any>) => {
      const rowId = row[props.itemKey];
      const index = selectedRows.findIndex((r) => r[props.itemKey] === rowId);
      if (index > -1) {
        selectedRows.splice(index, 1);
        selectedRowIdsSet.value.delete(rowId);
      } else {
        selectedRows.push(row);
        selectedRowIdsSet.value.add(rowId);
      }
    };

    const onSort = (e: { column: string; desc: boolean }) => {
      sortBy.value = e.column;
      sortDesc.value = e.desc;
    };

    const onFilter = (e: { column: string; values: string[] }) => {
      if (e.values.length) {
        filterBy.value[e.column] = new Set(e.values);
      } else {
        delete filterBy.value[e.column];
      }
    };

    const onFilterColumns = (e: string[]) => {
      selectedColumns.value = new Set(e);
    };

    // Refer to https://github.com/SheetJS/sheetjs/issues/817#issuecomment-331605640
    const exportSheet = () => {
      saveJsonAsXlsx(
        selectedRows.length ? selectedRows : rows.value,
        `${props.exportFileName}.xlsx`,
        `${props.exportWorksheetName}`
      );
    };

    return {
      hasPrev,
      hasNext,
      hasAppliedFilters,
      rows,
      columns,
      sortBy,
      sortDesc,
      toggleRow,
      onSort,
      onFilter,
      onFilterColumns,
      exportSheet,
      selectedRowIdsSet,
      headers,
      isLargeScreen,
    };
  },
});
</script>

<style lang="postcss" scoped>
.action-button {
  @apply border px-2;
  background-color: #fcfcfc;
}
.grid-header {
  background: #e7ecf0;
  color: #5c99b7;
  @apply flex;

  & .grid-cell:not(:first-of-type) {
    border-left: 1px solid rgba(92, 153, 183, 0.25);
  }
}

.grid-subheader-row {
  @apply py-1;
  background-color: rgb(221, 221, 221);
}

.grid-row {
  background-color: #fcfcfc;
  @apply flex cursor-default;

  &:nth-of-type(even) {
    @apply bg-indigo-50 bg-opacity-25;
  }

  &:hover {
    background-color: #e9eff1;
  }
}

.grid-cell {
  padding: 8px 4px;
}
</style>
