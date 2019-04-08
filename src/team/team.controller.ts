import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }
    @Get('all')
    @Roles('Admin')
    async getAllTeams(): Promise<Team[]> {
        return await this.teamService.findAll();
    }

    @Post('add')
    @Roles('Admin')
    async create(@Body() team: Team) {
        return this.teamService.addTeam(team);
    }
}
