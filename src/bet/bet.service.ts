import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Repository } from 'typeorm';
import { Match } from 'src/match/match.entity';
import { Team } from 'src/team/team.entity';

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>,
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>) { }

    async findAll(): Promise<Bet[]> {
        return await this.betRepository.find();
    }

    async matches(): Promise<any[]> {
        var matches= await this.matchRepository.find();
        var teams= await this.teamRepository.find();
        var output=[];
        matches.forEach((m)=>{
            var team1=teams.find((t)=>t.id==m.team1);
            var team2=teams.find((t)=>t.id==m.team2);
            output.push({
                id:m.id,
                description:m.name+" "+team1.name+" vs "+team2.name,
                team1:team1,
                team2:team2,
                team1Ratio:0.1,
                team2Ratio:0.2 
        });})
        return output;
    }

    async add(bet: Bet): Promise<Bet> {
        bet.id = null;
        return await this.betRepository.save(bet);
    }
}
