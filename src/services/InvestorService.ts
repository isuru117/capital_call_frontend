import axios from 'axios'
import type { Investor } from '@/types/Investor'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default {
  async fetchInvestors(): Promise<Investor[]> {
    const response = await api.get('/investors')
    return response.data
  },
  async fetchInvestorById(id: string): Promise<Investor> {
    const response = await api.get(`/investors/${id}/`)
    return response.data
  },
  async createInvestor(investor: Investor): Promise<Investor> {
    const response = await api.post('/investors/', investor)
    return response.data
  },
}
