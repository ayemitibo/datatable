<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { searchState } from "/@src/state";
import IconMagnifier from "/@src/assets/icons/magnifier.svg?component";

export default defineComponent({
  name: "App",
  components: {
    IconMagnifier,
  },
  setup() {
    const searchbox = ref<HTMLInputElement>();
    const route = useRoute();

    const onSearch = () => {
      searchState.value = searchbox.value?.value ?? "";
    };

    watch(
      () => route.fullPath,
      () => {
        searchState.value = "";
        if (searchbox.value) {
          searchbox.value.value = "";
        }
      }
    );

    return { onSearch, searchbox };
  },
});
</script>
