<template>
  <section class="cards">
    <InvestorCard v-for="investor in investors" :key="investor.id" :investor="investor" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import InvestorCard from './InvestorCard.vue'
import type { Investor } from '@/types/Investor'

export default defineComponent({
  name: 'InvestorList',
  components: {
    InvestorCard,
  },
  props: {
    investors: {
      type: Array as PropType<Investor[]>,
      required: true,
    },
  },
})
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 2rem;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
