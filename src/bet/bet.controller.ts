import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';

@Controller('bet')
export class BetController {
    constructor(private readonly betService: BetService) { }

    @Get('all')
    async getAllUsers(): Promise<Bet[]> {
        return await this.betService.findAll();
    }

    @Get('matches')
    async getAllMatches(): Promise<any[]> {
        return await this.betService.matches();
    }
    @Get('matchDetails/:matchId')
    async getMatchDetails(@Param('matchId') matchId: number): Promise<string> {
        return await this.betService.matchDetails(matchId);
    }
    @Post('add')
    async create(@Body() bet: Bet) {
        console.log(bet);
        return this.betService.add(bet);
    }

}
