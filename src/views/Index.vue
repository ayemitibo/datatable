<template>
  <div>
    <VTable :options="options" />
  </div>
</template>
<script lang="ts">
import VTable from "/@src/components/organisms/VTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    VTable,
  },
  data() {
    return {
      options: {
        headings: {
          issuer: "Issuer",
          dealName: "deal Name",
          industry: "Industry",
          agent: "Agent",
        },
      },
    };
  },
});
</script>
