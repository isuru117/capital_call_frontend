<template>
  <main class="capital-calls-page">
    <h1>Capital Calls</h1>
    <p>Manage all capital calls available</p>

    <section class="cards">
      <CapitalCallCard v-for="capitalCall in capitalCalls" :key="capitalCall.id" :capitalCall="capitalCall"
        @edit="openEditCapitalCallModal(capitalCall)" />
    </section>

    <EditCapitalCallModal v-if="showEditCapitalCallModal" :capitalCall="selectedCapitalCall"
      :isVisible="showEditCapitalCallModal" @close="closeEditCapitalCallModal" @save="editCapitalCall" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AddInvestorModal from '@/components/AddInvestorModal.vue'
import CapitalCallCard from '@/components/CapitalCallCard.vue'
import EditCapitalCallModal from '@/components/EditCapitalCallModal.vue'
import type { CapitalCall } from '@/types/CapitalCall'
import CapitalCallService from '@/services/CapitalCallService'
import { useToast } from 'vue-toast-notification'
import { useLoading } from 'vue-loading-overlay'

const $toast = useToast();
const $loading = useLoading({
  canCancel: false,
  loader: 'dots',
  color: 'green'
})

export default defineComponent({
  name: 'CapitalCalls',
  components: {
    CapitalCallCard,
    AddInvestorModal,
    EditCapitalCallModal,
  },
  data() {
    return {
      capitalCalls: [] as CapitalCall[],
      showInputInvestorModal: false,
      showEditCapitalCallModal: false,
      selectedCapitalCall: null as CapitalCall | null,
    }
  },
  async mounted() {
    let loader = $loading.show()

    try {
      this.capitalCalls = await CapitalCallService.fetchCapitalCalls()
    } catch (error) {
      console.error('Failed to load investors', error)
    } finally {
      loader.hide()
    }
  },
  methods: {
    openModal() {
      this.showInputInvestorModal = true
    },
    closeModal() {
      this.showInputInvestorModal = false
    },
    async updateCapitalCall() {
      let loader = $loading.show()

      try {
        const modifiedCapitalCall = null
        if (modifiedCapitalCall !== null) {
          this.showInputInvestorModal = false
        }
      } catch (error) {
        console.error('Failed to update Capital Call', error)
      } finally {
        loader.hide()
      }
    },
    openEditCapitalCallModal(capitalCall: CapitalCall) {
      this.selectedCapitalCall = capitalCall
      this.showEditCapitalCallModal = true
    },
    closeEditCapitalCallModal() {
      this.showEditCapitalCallModal = false
      this.selectedCapitalCall = null
    },
    async editCapitalCall(updatedCapitalCall: CapitalCall) {
      let loader = $loading.show()

      try {
        const updatedCapitalCallObj = await CapitalCallService.updateCapitalCallsStatus(
          updatedCapitalCall.id,
          updatedCapitalCall.status,
          updatedCapitalCall.due_date
        )

        if (updatedCapitalCallObj !== null) {
          const index = this.capitalCalls.findIndex((call) => call.id === updatedCapitalCall.id)
          if (index !== -1) {
            this.capitalCalls[index] = { ...this.capitalCalls[index], ...updatedCapitalCall }
          }
          this.closeEditCapitalCallModal()

          $toast.success('Capital Call edited Successfully!')
        }
      } catch (error) {
        console.error('Failed to edit capital call', error)
        $toast.error('Failed to edit capital call')
      } finally {
        loader.hide()
      }
    },
  },
})
</script>

<style scoped>
.home-page {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

section.cards .InvestorCard {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  max-height: 300px;
}

section.cards .InvestorCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
