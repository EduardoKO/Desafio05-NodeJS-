/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';
import CreateTransactionDTO from '../DTOS/CreateTransactionDTO';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.value, 0);

    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((sum, item) => sum + item.value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(createTransactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(createTransactionDTO);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
