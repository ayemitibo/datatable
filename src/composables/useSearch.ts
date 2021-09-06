import { computed } from 'vue'
import { searchState } from '/@src/state'
import { isDef, isDate } from '/@src/utils'

export const useSearch = (records: Record<string, any>[]) =>
  computed(() => {
    if (!searchState.value) return records

    return records.filter((row) => {
      return Object.keys(row).some((column) => {
        let val = row[column]
        if (!isDef(val)) {
          return false
        }
        val = isDate(val) ? val.toLocaleDateString() : val.toString()

        return val
          .toLowerCase()
          .includes(searchState.value.trim().toLowerCase())
      })
    })
  })
