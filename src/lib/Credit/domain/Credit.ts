export class Credit {
  id: number
  amount: number
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date

  constructor(
    id: number,
    name: string,
    amount: number,
    active: boolean,
    createdAt: Date | null,
    updatedAt: Date | null
  ) {
    this.id = id
    this.name = name
    this.amount = amount
    this.active = active
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
  }
}
