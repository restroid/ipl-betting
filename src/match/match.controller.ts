import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('match')
export class MatchController {

    constructor(private readonly matchService: MatchService) { }
    @Get('all')
    @Roles('Admin')
    async getAllMatches(): Promise<Match[]> {
        return await this.matchService.findAll();
    }

    @Post('add')
    @Roles('Admin')
    async create(@Body() match: Match) {
        return this.matchService.add(match);
    }
    @Post('setWinner')
    @Roles('Admin')
    async setWinner(@Body() match: Match) {
        return this.matchService.setWinner(match);
    }
   
}
