<template>
  <div class="card" @click="goToInvestorPage">
    <div class="card-inner">
      <div class="card-header">
        <img class="profile-picture" :src="getProfilePictureUri()" alt="Profile picture" />
        <div class="header-text">
          <h2>{{ investor.name }}</h2>
          <p class="role">Investor</p>
        </div>
      </div>
      <div class="card-detail">
        <p><strong>Email:</strong> {{ investor.email }}</p>
        <p><strong>IBAN:</strong> {{ formatIBANstring(investor.iban) }}</p>
        <p><strong>Total Investment:</strong> €{{ investor.total_investment }}</p>
        <p><strong>Investment Date:</strong> {{ investor.investment_date }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Investor } from '@/types/Investor'
import type { PropType } from 'vue'
import { formatIBANstring } from '@/utils/DataUtils'

export default {
  name: 'InvestorCard',
  props: {
    investor: {
      type: Object as PropType<Investor>,
      required: true,
    },
  },
  methods: {
    goToInvestorPage() {
      this.$router.push({ name: 'InvestorDetails', params: { id: this.investor.id } })
    },
    getProfilePictureUri() {
      let formattedName = this.investor.name.replace(' ', '+')
      return `https://eu.ui-avatars.com/api/?name=${formattedName}&size=60`
    },
  },
  data() {
    return { formatIBANstring }
  }
}
</script>

<style scoped>
.card {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-picture {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-text {
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 1.3rem;
  margin: 0;
  color: #333;
}

.role {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.2rem;
}

.card-detail {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}

.card-detail p {
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
}

.card-detail p strong {
  color: #333;
  margin-right: 0.5rem;
}
</style>
