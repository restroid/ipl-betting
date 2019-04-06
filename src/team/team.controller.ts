import { Controller, Get, Post, Body } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';


@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }
    @Get('all')
    async getAllUsers(): Promise<Team[]> {
        return await this.teamService.findAll();
    }

    @Post('add')
    async create(@Body() team: Team) {
        return this.teamService.addTeam(team);
    }
}
