import type { BillType } from './BillType'
import type { Investor } from './Investor'

export interface Bill {
  id: number
  investor: Investor
  capital_call?: any
  amount: number
  bill_type: BillType
  generated_at: string
}
