import axios from 'axios'
import type { Bill } from '@/types/Bill'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default {
  async fetchBills(): Promise<Bill[]> {
    const response = await api.get('/bills/')
    return response.data
  },
  async fetchBillsByInvestor(id: string): Promise<Bill[]> {
    const response = await api.get(`/bills/by-investor/${id}/`)
    return response.data
  },
  async createBill(bill: Bill): Promise<any> {
    const response = await api.post('/bills/', bill)
    if (response.status === 201) {
      return response.data
    }
    return null
  },
}
