<template>
  <div>
    <Grid
      class="grid"
      label="Deals"
      :items="deals"
      :headers="headers"
      export-worksheet-name="Deals"
      :page="page"
      :total-pages="totalPages"
    >
      <template #issuer="{ value }"> Hello {{ value }} </template>
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
    </Grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useGetDealData, useSearch, usePagination } from "/@src/composables";
import Grid from "./Grid.vue";

export default defineComponent({
  components: {
    Grid,
  },

  props: {
    options: {
      type: Object,
    },
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
    const [deals, page, totalPages] = usePagination(filteredDeals, 100);

    let mappedHeaders: string[] = [];

    mappedHeaders = Object.keys(props.options?.headings);

    let headers = mappedHeaders.map((item) => {
      return { value: item, text: props.options?.headings[item] };
    });

    return { deals, headers, page, totalPages };
  },
});
</script>
