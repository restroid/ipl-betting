import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }
    
    @Get('all')
    async getAllTransactions(): Promise<any[]> {
        return await this.transactionService.findAll();
    }
    
    //@UsePipes(ValidationPipe)
    @Post('add')
    async create(@Body() Transaction: Transaction) {
        return this.transactionService.addtransaction(Transaction);
    }
}
