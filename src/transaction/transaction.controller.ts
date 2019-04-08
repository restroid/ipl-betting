import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
@UseGuards(AuthGuard(),RolesGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }
    
    @Get('all')
    @Roles('Admin')
    async getAllTransactions(): Promise<any[]> {
        return await this.transactionService.findAll();
    }

    @Post('add')   
    @Roles('Admin')
    async create(@Body() Transaction: Transaction) {
        return this.transactionService.addtransaction(Transaction);
    }
}
