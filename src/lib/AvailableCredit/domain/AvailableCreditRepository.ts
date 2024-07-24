import { AvailableCredit } from "./AvailableCredit";

export interface AvailableCreditRepository {
  getAll(): Promise<AvailableCredit[]>;
  findByAvailableByCreditIdAndUserId(creditId: number, userId: number): Promise<AvailableCredit | null>;
  create(availableCredit: AvailableCredit): Promise<void>;
}
