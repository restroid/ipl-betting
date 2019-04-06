import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>) { }

    async findAll(): Promise<Match[]> {
        return await this.matchRepository.find();
    }

    async add(match: Match): Promise<Match> {
        match.id = null;
        return await this.matchRepository.save(match);
    }
}
