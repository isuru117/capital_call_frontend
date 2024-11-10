<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h2>Add New Investor</h2>
      <form @submit.prevent="handleSubmit">
        <label>
          Name:
          <input type="text" v-model="newInvestor.name" required placeholder="Enter name" />
        </label>
        <label>
          Email:
          <input type="email" v-model="newInvestor.email" required placeholder="Enter email" />
        </label>
        <label>
          IBAN:
          <input type="text" v-model="newInvestor.iban" @input="formatAndValidateIBAN" required maxlength="34"
            placeholder="Enter IBAN" />
        </label>
        <label>
          Total Investment:
          <div class="currency-input">
            <input type="number" v-model="newInvestor.total_investment" required placeholder="Enter investment amount"
              step="0.01" min="0" />
            <span class="currency-symbol">EUR</span>
          </div>
        </label>
        <label>
          Investment Date:
          <input type="date" v-model="newInvestor.investment_date" required />
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
import { formatIBAN, formatAmount } from '@/utils/DataUtils'
import { defineComponent, ref, } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'AddInvestorModal',
  props: {
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const newInvestor = ref({
      name: '',
      email: '',
      iban: '',
      total_investment: 0,
      investment_date: '',
    })

    function closeModal() {
      emit('close')
    }

    function formatAndValidateIBAN() {
      const { formattedIBAN, isValid } = formatIBAN(newInvestor.value.iban)
      newInvestor.value.iban = formattedIBAN

      if (!isValid) {
        console.warn('Invalid IBAN format')
        // Optionally, set an error flag or message here
      }
    }

    function handleSubmit() {
      newInvestor.value.total_investment = formatAmount(newInvestor.value.total_investment)

      emit('save', newInvestor.value)
      closeModal()
    }

    return {
      newInvestor,
      formatInvestment: formatAmount,
      formatAndValidateIBAN,
      closeModal,
      handleSubmit,
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

input {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

input::placeholder {
  color: #bbb;
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

  input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
