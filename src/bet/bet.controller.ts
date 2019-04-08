import { Controller, Body, Post, Get, Param, UseGuards, Res, Req } from '@nestjs/common';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bet')
@UseGuards(AuthGuard(),RolesGuard)
export class BetController {
    constructor(private readonly betService: BetService) { }
   
    @Get('matches')
    @Roles('Member')
    async getAllMatches(): Promise<any[]> {
        return await this.betService.matches();
    }

    @Post('add')
    @Roles('Member')
    async create(@Body() bet: Bet,@Req() req) {
        bet.userId=req.user.id;
        return this.betService.add(bet);
    }
    @Get('myTrans')
    @Roles('Member')
    async myTransactions(@Req() req):Promise<any[]>{
        return await this.betService.findForUser(req.user.id);
    }

}
