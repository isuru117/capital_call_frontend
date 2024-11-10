import type { Investor } from './Investor'
import { StatusChoices } from './StatusChoices'

export interface CapitalCall {
  id: number
  investor: Investor
  total_amount: string
  status: StatusChoices
  due_date: string
  created_at: string
}
