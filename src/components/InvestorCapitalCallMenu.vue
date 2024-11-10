<template>
    <div class="bill-menu-wrapper">
        <button class="collapse-btn" @click="toggleSection">
            {{ isSectionCollapsed ? 'Show Capital Calls' : 'Hide Capital Calls' }}
            <span class="arrow" :class="{ rotated: isSectionCollapsed }">▼</span>
        </button>

        <div v-if="!isSectionCollapsed" class="bill-menu">
            <section class="cards">
                <CapitalCallCard v-for="capitalCall in capitalCalls" :key="capitalCall.id" :capitalCall="capitalCall"
                    @edit="handleEditCapitalCall" />
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

import CapitalCallCard from './CapitalCallCard.vue'
import type { CapitalCall } from '@/types/CapitalCall'

export default defineComponent({
    name: 'InvestorCapitalCallMenu',
    components: {
        CapitalCallCard,
    },
    props: {
        investor: {
            type: Object as PropType<{ name: string; id: number }>,
            required: true,
        },
        capitalCalls: {
            type: Array as PropType<CapitalCall[]>,
            required: true,
        },
    },
    emits: ['editCapitalCall'],
    setup(_, { emit }) {
        const isSectionCollapsed = ref(false)

        function toggleSection() {
            isSectionCollapsed.value = !isSectionCollapsed.value
        }

        function handleEditCapitalCall(capitalCall: CapitalCall) {
            emit('editCapitalCall', capitalCall)
        }

        return {
            isSectionCollapsed,
            toggleSection,
            handleEditCapitalCall,
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
