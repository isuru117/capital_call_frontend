<template>
    <div class="bill-menu-wrapper">
        <button class="collapse-btn" @click="toggleSection">
            {{ isSectionCollapsed ? 'Show Bills' : 'Hide Bills' }}
            <span class="arrow" :class="{ rotated: isSectionCollapsed }">▼</span>
        </button>

        <div v-if="!isSectionCollapsed" class="bill-menu">
            <button class="btn" @click="openModal">+ Add New Bill for {{ investor.name }}</button>
            <button class="btn" @click="submitSelectedBills" :disabled="selectedBills.length === 0">
                Generate Capital Call
            </button>

            <section class="cards">
                <BillCard v-for="bill in bills" :key="bill.id" :bill="bill"
                    :isSelected="selectedBills.includes(bill.id)" :toggleSelection="toggleBillSelection" />
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import BillCard from '@/components/BillCard.vue'
import { Bill } from '@/types/Bill'

export default defineComponent({
    name: 'InvestorBillMenu',
    components: {
        BillCard,
    },
    props: {
        investor: {
            type: Object as PropType<{ name: string; id: number }>,
            required: true,
        },
        bills: {
            type: Array as PropType<Bill[]>,
            required: true,
        },
        selectedBills: {
            type: Array as PropType<number[]>,
            required: true,
        },
    },
    emits: ['openModal', 'submitSelectedBills', 'toggleBillSelection'],
    setup(_, { emit, props }) {
        const isSectionCollapsed = ref(false)

        function toggleSection() {
            isSectionCollapsed.value = !isSectionCollapsed.value
        }

        function openModal() {
            emit('openModal')
        }

        function submitSelectedBills() {
            emit('submitSelectedBills')
        }

        function toggleBillSelection(billId: number) {
            emit('toggleBillSelection', billId)
        }

        return {
            isSectionCollapsed,
            toggleSection,
            openModal,
            submitSelectedBills,
            toggleBillSelection,
        }
    },
})
</script>

<style scoped>
.bill-menu-wrapper {
    margin-top: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bill-menu {
    background-color: #fff;
    padding: 1.5rem;
    border-top: 1px solid #e0e0e0;
}

.collapse-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    color: #333;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.collapse-btn:hover {
    background-color: #f0f0f0;
}

.arrow {
    display: inline-block;
    transition: transform 0.3s ease;
    font-size: 1.2rem;
    margin-left: 0.5rem;
}

.arrow.rotated {
    transform: rotate(-90deg);
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
</style>
