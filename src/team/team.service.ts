import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>) { }

    async findAll(): Promise<Team[]> {
        return await this.teamRepository.find();
    }

    async addTeam(team: Team): Promise<Team> {
        team.id = null;
        return await this.teamRepository.save(team);
    }
}
