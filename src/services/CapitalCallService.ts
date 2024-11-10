import type { CapitalCall } from '@/types/CapitalCall'
import type { StatusChoices } from '@/types/StatusChoices'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default {
  async fetchCapitalCalls(): Promise<CapitalCall[]> {
    const response = await api.get('/capital_calls/')
    return response.data
  },
  async generateCapitalCall(investorId: number, billIds: number[]): Promise<CapitalCall> {
    try {
      const response = await api.post('/capital_calls/generate/', {
        bill_ids: billIds,
        investor_id: investorId,
      })
      return response.data
    } catch (error) {
      console.error('Error generating capital call:', error)
      throw error
    }
  },
  async fetchCapitalCallsByInvestor(id: string): Promise<CapitalCall[]> {
    const response = await api.get(`/capital_calls/by-investor/${id}/`)
    return response.data
  },
  async updateCapitalCallsStatus(id: number, status: StatusChoices, due_date: string): Promise<CapitalCall> {
    const response = await api.patch(`/capital_calls/${id}/update/`, {
      status: status,
      due_date: due_date
    })
    return response.data
  },
}
