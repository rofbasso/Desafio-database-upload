import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const returnBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactionRepository = await this.find();

    transactionRepository.forEach(balance => {
      if (balance.type === 'income') {
        returnBalance.income += Number(balance.value);
      } else {
        returnBalance.outcome += Number(balance.value);
      }
    });

    returnBalance.total = returnBalance.income - returnBalance.outcome;

    return returnBalance;
  }
}

export default TransactionsRepository;
