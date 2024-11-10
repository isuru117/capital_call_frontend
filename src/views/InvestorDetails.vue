<template>
  <main class="investor-detail">
    <div v-if="investor">
      <h1>Investor: {{ investor.name }}</h1>
      <p>Manage Capital Calls and Bills for {{ investor.name }}</p>

      <div class="investor-info">
        <div class="info-row" v-for="(value, key) in investor" :key="key">
          <p>
            <strong>{{ key }}:</strong>
          </p>
          <p>{{ value }}</p>
        </div>
      </div>

      <InvestorBillMenu :investor="investor" :bills="bills" :selectedBills="selectedBills" @openModal="openModal"
        @submitSelectedBills="submitSelectedBills" @toggleBillSelection="toggleBillSelection" />

      <InvestorCapitalCallMenu :investor="investor" :capitalCalls="capitalCalls"
        @editCapitalCall="openEditCapitalCallModal" />

      <AddBillModal v-if="showInputBillModal" :isVisible="showInputBillModal" @close="closeModal" @save="addBill"
        :investor="investor" />

      <EditCapitalCallModal v-if="showEditCapitalCallModal" :capitalCall="selectedCapitalCall"
        :isVisible="showEditCapitalCallModal" @close="closeEditCapitalCallModal" @save="editCapitalCall" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import InvestorService from '@/services/InvestorService'
import BillService from '@/services/BillService'
import InvestorBillMenu from '@/components/InvestorBillMenu.vue'
import AddBillModal from '@/components/AddBillModal.vue'
import { useRoute } from 'vue-router'
import CapitalCallService from '@/services/CapitalCallService'
import type { Investor } from '@/types/Investor'
import { Bill } from '@/types/Bill'
import InvestorCapitalCallMenu from '@/components/InvestorCapitalCallMenu.vue'
import type { CapitalCall } from '@/types/CapitalCall'
import EditCapitalCallModal from '@/components/EditCapitalCallModal.vue'
import { useToast } from 'vue-toast-notification'
import { useLoading } from 'vue-loading-overlay'

export default defineComponent({
  name: 'InvestorDetails',
  components: {
    InvestorBillMenu,
    InvestorCapitalCallMenu,
    AddBillModal,
    EditCapitalCallModal,
  },
  setup() {
    const route = useRoute()
    const investor = ref<Investor | null>(null)
    const bills = ref<Bill[]>([])
    const capitalCalls = ref<CapitalCall[]>([])
    const showInputBillModal = ref(false)
    const showEditCapitalCallModal = ref(false)
    const selectedBills = ref<number[]>([])
    const selectedCapitalCall = ref<CapitalCall | null>(null)

    const $toast = useToast()
    const $loading = useLoading({
      canCancel: false,
      loader: 'dots',
      color: 'green'
    })

    function openEditCapitalCallModal(capitalCall: CapitalCall) {
      selectedCapitalCall.value = capitalCall
      showEditCapitalCallModal.value = true
    }

    function closeEditCapitalCallModal() {
      showEditCapitalCallModal.value = false
    }

    onMounted(async () => {
      const investorId = route.params.id as string
      let loader = $loading.show();

      try {
        const [investorData, billsData, capitalCallsData] = await Promise.all([
          InvestorService.fetchInvestorById(investorId),
          BillService.fetchBillsByInvestor(investorId),
          CapitalCallService.fetchCapitalCallsByInvestor(investorId)
        ]);

        investor.value = investorData;
        bills.value = billsData;
        capitalCalls.value = capitalCallsData;

      } catch (error) {
        console.error('Failed to load data', error);
        $toast.error('Failed to load all data. Some information may be missing.');
      } finally {
        loader.hide();
      }
    })

    function openModal() {
      showInputBillModal.value = true
    }

    function closeModal() {
      showInputBillModal.value = false
    }

    async function addBill(newBill: Bill) {
      let loader = $loading.show();

      try {
        const savedBill = await BillService.createBill(newBill)
        if (savedBill !== null) {
          bills.value.unshift(savedBill)
          showInputBillModal.value = false
          $toast.success('Bill Created Successfully!')
        }
      } catch (error) {
        console.error('Failed to add bill', error)
        $toast.error('Failed to add bill')
      } finally {
        loader.hide()
      }
    }

    async function editCapitalCall(updatedCapitalCall: CapitalCall) {
      let loader = $loading.show();

      try {
        const updatedCapitalCallObj = await CapitalCallService.updateCapitalCallsStatus(
          updatedCapitalCall.id,
          updatedCapitalCall.status,
          updatedCapitalCall.due_date
        )

        if (updatedCapitalCallObj !== null) {
          const index = capitalCalls.value.findIndex((call) => call.id === updatedCapitalCall.id)
          if (index !== -1) {
            capitalCalls.value[index] = { ...capitalCalls.value[index], ...updatedCapitalCall }
          }
          closeEditCapitalCallModal()

          $toast.success('Capital Call Edited Successfully!')
        }
      } catch (error) {
        console.error('Failed to edit Capital Call', error)
        $toast.error('Failed to edit Capital Call')
      } finally {
        loader.hide()
      }
    }

    function toggleBillSelection(billId: number) {
      const index = selectedBills.value.indexOf(billId)
      if (index === -1) {
        selectedBills.value.push(billId)
      } else {
        selectedBills.value.splice(index, 1)
      }
    }

    async function submitSelectedBills() {
      if (!investor.value) return

      let loader = $loading.show()

      try {
        const newCapitalCall = await CapitalCallService.generateCapitalCall(
          investor.value.id,
          selectedBills.value,
        )

        if (newCapitalCall !== null) {
          selectedBills.value = []
          capitalCalls.value.unshift(newCapitalCall)
          $toast.success('Capital Call Created Successfully!')
        }
      } catch (error) {
        console.error('Error generating capital call:', error)
        $toast.error('Error generating capital call')
      } finally {
        loader.hide()
      }
    }

    return {
      investor,
      bills,
      showInputBillModal,
      showEditCapitalCallModal,
      selectedBills,
      capitalCalls,
      selectedCapitalCall,
      openModal,
      closeModal,
      addBill,
      toggleBillSelection,
      submitSelectedBills,
      openEditCapitalCallModal,
      closeEditCapitalCallModal,
      editCapitalCall,
    }
  },
})
</script>

<style scoped>
.investor-detail {
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

p {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #333;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

section.cards .InvestorCard {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

section.cards .InvestorCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

AddInvestorModal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

AddInvestorModal .modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
}

.investor-info {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  color: #333;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row p {
  margin: 0;
}

.info-row p:first-child {
  font-weight: bold;
  color: #666;
}

.info-row p:last-child {
  color: #333;
  font-weight: 500;
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
