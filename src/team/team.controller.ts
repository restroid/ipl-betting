import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { join } from 'path';


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
   // @Render('public/index.html')
    async listTeams(@Res() res) {
       res.sendFile(join(__dirname, '..', '..','public',"index.html"));
    }
}
