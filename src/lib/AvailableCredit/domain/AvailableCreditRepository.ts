import { AvailableCredit } from "./AvailableCredit";
import { AvailableCreditWithUserAndCredit } from "./availableCreditWithUser";

export interface AvailableCreditRepository {
  getAll(): Promise<AvailableCreditWithUserAndCredit[]>;
  findByAvailableByCreditIdAndUserId(creditId: number, userId: number): Promise<AvailableCredit | null>;
  create(availableCredit: AvailableCredit): Promise<void>;
}
