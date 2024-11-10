<template>
    <div class="modal-overlay" v-if="capitalCall">
        <div class="modal-content">
            <h2>Edit Status for Capital Call</h2>
            <form @submit.prevent="handleSubmit">
                <label>
                    Capital Call Type:
                    <select v-model="editedCapitalCall.status" @change="setStatusChoice(editedCapitalCall.status)"
                        required>
                        <option v-for="status_choice in capitalCallStatusChoices" :key="status_choice"
                            :value="status_choice">
                            {{ formatCapitalCallType(status_choice) }}
                        </option>
                    </select>
                </label>

                <label>
                    Select Date:
                    <input type="date" v-model="editedCapitalCall.due_date" required />
                </label>

                <div class="actions">
                    <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
                    <button type="submit" class="save-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { CapitalCall } from '@/types/CapitalCall'
import { StatusChoices } from '@/types/StatusChoices'

export default defineComponent({
    name: 'EditCapitalCallModal',
    props: {
        isVisible: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        capitalCall: {
            type: Object as PropType<CapitalCall | null>,
            required: true,
        },
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
        const editedCapitalCall = ref({
            status: StatusChoices.Validated,
            due_date: '',
            ...props.capitalCall,
        })

        watch(() => props.capitalCall, (newCapitalCall) => {
            if (newCapitalCall) {
                editedCapitalCall.value = { ...newCapitalCall }
            }
        })

        const capitalCallStatusChoices = Object.values(StatusChoices)

        function setStatusChoice(selectedChoice: StatusChoices) {
            editedCapitalCall.value.status = selectedChoice
        }

        function formatCapitalCallType(type: StatusChoices): string {
            return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
        }

        function closeModal() {
            emit('close')
        }

        function handleSubmit() {
            emit('save', editedCapitalCall.value)
            closeModal()
        }

        return {
            editedCapitalCall,
            closeModal,
            handleSubmit,
            setStatusChoice,
            formatCapitalCallType,
            capitalCallStatusChoices,
        }
    },
})
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
}

label {
    display: block;
    margin-bottom: 1rem;
    font-size: 1rem;
}

input,
textarea {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
}

textarea {
    resize: vertical;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.currency-input {
    display: flex;
    align-items: center;
    position: relative;
}

.currency-input input {
    padding-right: 2.5rem;
    width: 100%;
    box-sizing: border-box;
}

.currency-symbol {
    position: absolute;
    right: 0.7rem;
    top: 40%;
    color: #666;
    font-weight: bold;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
}

button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cancel-btn {
    background-color: #ccc;
    color: #333;
    border: none;
}

.cancel-btn:hover {
    background-color: #bbb;
}

.save-btn {
    background-color: var(--primary);
    color: #fff;
    border: none;
}

.save-btn:hover {
    background-color: #0056b3;
}

@media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem;
    }

    h2 {
        font-size: 1.25rem;
    }

    input,
    textarea {
        font-size: 0.9rem;
    }

    button {
        font-size: 0.9rem;
    }
}
</style>
