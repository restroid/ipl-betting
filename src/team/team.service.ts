import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchService } from '../match/match.service';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>) { }

    async findAll(): Promise<Team[]> {
        return await this.teamRepository.find({SeriesName:MatchService.currentSeries});
    }

    async addTeam(team: Team): Promise<Team> {
        team.id = null;
        return await this.teamRepository.save(team);
    }
}
