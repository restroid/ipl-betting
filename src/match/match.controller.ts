import { Controller, Get, Post, Body } from '@nestjs/common';
import { Match } from './match.entity';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {

    constructor(private readonly matchService: MatchService) { }
    @Get('all')
    async getAllUsers(): Promise<Match[]> {
        return await this.matchService.findAll();
    }

    @Post('add')
    async create(@Body() match: Match) {
        match.id=null;
        console.log(match);
        return this.matchService.add(match);
    }
}
