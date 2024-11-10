<template>
  <div class="card" :class="{ selected: isSelected }" @click="toggleSelection(bill.id)">
    <div class="card-inner">
      <input type="checkbox" class="card-checkbox" @change="toggleSelection(bill.id)" :checked="isSelected" />
      <div class="card-detail">
        <h2>Bill ID: {{ bill.id }}</h2>
        <p>Bill Type: {{ bill.bill_type.toString() }}</p>
        <p>Date: {{ new Date(bill.generated_at).toLocaleString() }}</p>
        <p>Amount: {{ bill.amount }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Bill } from '@/types/Bill';
import { PropType } from 'vue';

export default {
  name: 'BillCard',
  props: {
    bill: {
      type: Object as PropType<Bill>,
      required: true
    },
    isSelected: Boolean,
    toggleSelection: Function,
  },
};
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  padding: 1rem;
  display: flex;
  cursor: pointer;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
}

.card-inner {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.card-checkbox {
  margin-right: 1.2rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.card-detail h2 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.card-detail p {
  margin: 0.3rem 0;
  color: #555;
}

.card-detail {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  flex-grow: 1;
}

.card.selected {
  border: 2px solid #4caf50;
}
</style>
