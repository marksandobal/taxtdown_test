import { Credit } from './Credit'

export interface CreditRepository {
  getAll(): Promise<Credit[]>
  findById(id: number): Promise<Credit | null>
  create(credit: Credit): Promise<void>
}
