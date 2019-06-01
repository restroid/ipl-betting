import { Controller, Body, Post, Get, Param, UseGuards, Res, Req, Query } from '@nestjs/common';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bet')
@UseGuards(AuthGuard(), RolesGuard)
export class BetController {
    constructor(private readonly betService: BetService) { }

    @Get('matches')
    @Roles('Member')
    async getAllMatches(): Promise<any[]> {
        return await this.betService.matches();
    }
    @Get('matchesAdmin')
    @Roles('Member')
    async getAllMatchesAdmin(): Promise<any[]> {
        return await this.betService.matchesAdmin();
    }
    @Post('add')
    @Roles('Member')
    async create(@Body() bet: Bet, @Req() req:any) {
        bet.userId = req.user.id;
        return this.betService.add(bet);
    }

     
    @Get('myAmount')
    @Roles('Member')
    async myAmount( @Req() req:any):Promise<any>{
        return await this.betService.balanceForUser(req.user.id);
    }

    @Get('myTrans')
    @Roles('Member')
    async myTransactions(@Query('seriesName') seriesName: string, @Req() req: any): Promise<any[]> {
        //console.log(seriesName);
        return await this.betService.findForUser(req.user.id, seriesName);
    }

}
