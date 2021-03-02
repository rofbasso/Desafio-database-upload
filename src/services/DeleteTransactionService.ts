import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const transactionRemove = await transactionRepository.findOne({
      where: { id },
    });

    if (!transactionRemove) {
      throw new AppError('ID not found', 400);
    }

    await transactionRepository.remove(transactionRemove);
  }
}

export default DeleteTransactionService;
