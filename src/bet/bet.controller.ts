import { Controller, Body, Post, Get, Param, UseGuards, Res, Req } from '@nestjs/common';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard())
    async create(@Body() bet: Bet,@Req() req) {
        bet.userId=req.user.id;
        return this.betService.add(bet);
    }

}
