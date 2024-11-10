<template>
    <div class="card">
        <div class="card-inner">
            <button class="edit-icon" @click="handleEdit">
                <span class="material-icons">edit_note</span>
            </button>
            <div class="card-content">
                <img :src="logoURL" alt="Company Logo" class="logo" />
                <p class="line"><span class="label">IBAN:</span> <strong class="value">{{
                    formatIBANstring(capitalCall.investor.iban)
                        }}</strong></p>
                <br />
                <p class="line"><span class="label">STATUS:</span> <strong class="value">{{ capitalCall.status
                        }}</strong></p>
                <p class="line"><span class="label">DUE DATE:</span> <strong class="value">{{ new
                    Date(capitalCall.due_date).toLocaleDateString() }}</strong></p>
                <br />
                <p class="line"><span class="label">FROM:</span> <strong class="value">ARCHIMED SAS</strong></p>
                <p class="line"><span class="label">TO:</span> <strong class="value">{{ capitalCall.investor.name
                        }}</strong></p>
                <p class="line"><span class="label">EMAIL:</span> <strong class="value">{{ capitalCall.investor.email
                        }}</strong></p>
                <br />
                <p class="line"><span class="label">TOTAL AMOUNT:</span> <strong class="value">EUR {{
                    capitalCall.total_amount }}</strong></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { CapitalCall } from '@/types/CapitalCall'
import logoURL from '@/assets/logo.svg'
import { formatIBANstring } from '@/utils/DataUtils';

export default defineComponent({
    name: 'CapitalCallCard',
    props: {
        capitalCall: {
            type: Object as PropType<CapitalCall>,
            required: true,
        },
    },
    methods: {
        handleEdit() {
            this.$emit('edit', this.capitalCall)
        },
    },
    data() {
        return { logoURL, formatIBANstring }
    }
})
</script>

<style scoped>
.card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    transition: transform 0.2s;
    flex-direction: column;
    position: relative;
    max-width: 500px;
    font-family: Arial, sans-serif;
}

.card:hover {
    transform: translateY(-5px);
}

.card-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.logo {
    width: 50px;
    margin-bottom: 1rem;
}

.card-content .line {
    font-size: 14px;
    line-height: 1.6;
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.card-content .line strong {
    font-weight: bold;
    color: #333;
}

.value {
    font-weight: normal;
    text-transform: uppercase;
    color: #333;
}

.edit-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #4caf50;
    transition: color 0.2s ease, transform 0.2s ease;
}

.edit-icon .material-icons {
    font-size: 38px;
}

.edit-icon:hover {
    color: #388e3c;
    transform: scale(1.1);
}
</style>
