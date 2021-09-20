<template>
  <div>
    <VTable :options="options" :data="deals">
      <template #dealName="{ value }">
        <span
          class="
            inline-flex
            items-center
            justify-center
            px-2
            py-1
            text-xs
            font-bold
            leading-none
            text-red-100
            bg-red-600
            rounded-full
          "
          >Deal</span
        >
        {{ value }}
      </template>
    </VTable>
  </div>
</template>
<script lang="ts">
import VTable from "/@src/components/organisms/Grid.vue";
import { defineComponent } from "vue";
import { useGetDealData, useSearch, usePagination } from "/@src/composables";
export default defineComponent({
  components: {
    VTable,
  },
  data() {
    return {
      options: {
        headings: {
          issuer: { title: "Issuer", priority: 1 },
          dealName: { title: "deal Name", priority: 1 },
          industry: { title: "Industry", priority: 1 },
          agent: "Agent",
        },
      },
    };
  },
  setup(props) {
    const {
      holdings,
      industriesMap,
      issuersMap,
      agentsMap,
      sourcesMap,
      analystsMap,
    } = useGetDealData();

    const rawDeals = holdings.map(
      ({
        Id,
        IssuerId,
        DealName,
        IndustryId,
        AgentId,
        SourceId,
        Total,
        LastPosted,
        LastAccessed,
        AnalystIds,
        DocCount,
      }) => ({
        id: Id,
        issuer: issuersMap[IssuerId],
        dealName: DealName,
        industry: industriesMap[IndustryId],
        agent: agentsMap[AgentId],
        source: sourcesMap[SourceId],
        total: Total,
        lastPosted: new Date(LastPosted),
        lastAccessed: new Date(LastAccessed),
        analysts: (AnalystIds ?? []).map((id) => analystsMap[id]),
        docCount: DocCount,
      })
    );

    const filteredDeals = useSearch(rawDeals);
    const [deals] = usePagination(filteredDeals, 100);

    return { deals };
  },
});
</script>
