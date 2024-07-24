import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { AvailableCreditCreate } from "../../../lib/AvailableCredit/application/AvailableCreditCreate/AvailableCreditCreate";
import { AvailableCredit } from "../../../lib/AvailableCredit/domain/AvailableCredit";
import { PostgreAvailableCreditRepository } from "src/lib/AvailableCredit/infrastructure/PostgreAvailableCreditRepository";

describe('AvailableCreditCreate', () => {
  let repositoryMock: DeepMocked<PostgreAvailableCreditRepository>;
  let useCase: AvailableCreditCreate;
  const availableCredit = new AvailableCredit(1, 100000, 1, 1, new Date(), new Date());

  beforeEach(() => {
    repositoryMock = createMock<PostgreAvailableCreditRepository>();
    jest.spyOn(repositoryMock, 'create').mockResolvedValue();
    useCase = new AvailableCreditCreate(repositoryMock);
  });

  it('should create a new available credit', async () => {
    repositoryMock.findByAvailableByCreditIdAndUserId.mockResolvedValue(null);

    await useCase.run(availableCredit.amount, availableCredit.creditId, availableCredit.userId);

    expect(repositoryMock.create).toHaveBeenCalled();
  });

  it('should throw an error if the available credit already exists', async () => {
    repositoryMock.findByAvailableByCreditIdAndUserId.mockResolvedValue(availableCredit);

    await expect(
      useCase.run(availableCredit.amount, availableCredit.creditId, availableCredit.userId)
    ).rejects.toThrow();
  });
});
