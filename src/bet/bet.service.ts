import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Repository } from 'typeorm';
import { Match } from 'src/match/match.entity';
import { Team } from 'src/team/team.entity';
import { Transaction } from 'src/transaction/transaction.entity';

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
        var matches = await this.matchRepository.find();
        var teams = await this.teamRepository.find();
        var bets=await this.betRepository.find();
        var output = [];
        matches.forEach((m) => {
            var team1= teams.find((t) => t.id == m.team1);
            var team2 = teams.find((t) => t.id == m.team2);
            var matchTransactions=bets.filter((b)=>b.matchId==m.id);
            var t1Total=0;
            var matchTotal=0;
            var t2Total=0;
            matchTransactions.forEach((t)=>{
                if(t.teamId==team1.id)
                {
                    t1Total+=t.amount;
                }
                if(t.teamId==team2.id)
                {
                    t2Total+=t.amount;
                }
                matchTotal+=t.amount;
            });
            output.push({
                id: m.id,
                description: team1.name + " vs " + team2.name,
                team1: team1,
                team2: team2,
                team1Ratio: t2Total/matchTotal,
                team2Ratio: t1Total/matchTotal,
                matchTotal:matchTotal
            });
        })
        return output;
    }
    async matchDetails(matchId: number): Promise<string> {
        //return await this.betRepository.find();
        return "some detail! for match" + matchId;
    }
    async add(bet: Bet): Promise<Bet> {
        bet.id = null;
        return await this.betRepository.save(bet);
    }
}
