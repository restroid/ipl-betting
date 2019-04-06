import { Controller, Get, Post, Body, Render } from '@nestjs/common';
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

    @Get("listteams")
    @Render('index')
    async listTeams(@Body() team: Team) {
        var teams=await this.teamService.findAll();
        return {teams:teams};
    }
}
