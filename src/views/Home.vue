<template>
  <main class="home-page">
    <h1>Investors</h1>
    <p>Create or select an investor profile to manage</p>

    <button class="btn" @click="openModal">+ Add New Investor</button>

    <section class="cards">
      <InvestorCard v-for="investor in investors" :key="investor.id" :investor="investor" />
    </section>

    <AddInvestorModal v-if="showInputInvestorModal" :isVisible="showInputInvestorModal" @close="closeModal"
      @save="addInvestor" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InvestorService from '@/services/InvestorService'
import InvestorCard from '@/components/InvestorCard.vue'
import AddInvestorModal from '@/components/AddInvestorModal.vue'
import type { Investor } from '@/types/Investor'
import { useToast } from 'vue-toast-notification'
import { useLoading } from 'vue-loading-overlay'

const $toast = useToast()
const $loading = useLoading({
  canCancel: false,
  loader: 'dots',
  color: 'green'
})

export default defineComponent({
  name: 'Home',
  components: {
    InvestorCard,
    AddInvestorModal,
  },
  data() {
    return {
      investors: [] as Investor[],
      showInputInvestorModal: false
    }
  },
  async mounted() {
    let loader = $loading.show();

    try {
      this.investors = await InvestorService.fetchInvestors()
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
    async addInvestor(newInvestor: Investor) {

      let loader = $loading.show();

      try {
        const savedInvestor = await InvestorService.createInvestor(newInvestor)
        if (savedInvestor !== null) {
          this.investors.unshift(savedInvestor)
          this.showInputInvestorModal = false
          $toast.success('Successfully Added Investor!')
        }
      } catch (error) {
        console.error('Failed to add investor', error)
        $toast.error('Failed to add investor')
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
