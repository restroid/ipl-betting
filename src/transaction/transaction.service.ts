import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>) { }


    async findAll(): Promise<any[]> {
        return await this.transactionRepository
            .query(`select t.id,t.amount,t.date,u.name,t.mode,t.remark,t.SeriesName from transaction t 
            join user u on t.userId=u.id
            where t.userId=userId`);
    }

    addtransaction(transaction: Transaction) {
        if (transaction.remark == null)
            transaction.remark = transaction.mode;
        this.transactionRepository.save(transaction);
    }
}
