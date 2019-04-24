import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Bet } from '../bet/bet.entity';

@Injectable()
export class MatchService {

    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>) { }

    async findAll(): Promise<Match[]> {
        return await this.matchRepository.find();
    }

    async add(match: Match): Promise<Match> {
        match.id = null;
        match.winnerRatio = 0;
        match.winnerTeamId = 0;
        return await this.matchRepository.save(match);
    }
    async setWinner(match: Match): Promise<Match> {
        //todo: set match ratio
        var matchDb = await this.matchRepository.findOne(match.id);
        matchDb.winnerTeamId = match.winnerTeamId
        matchDb.winnerRatio = await this.getRatio(match.id, match.winnerTeamId);

        return await this.matchRepository.save(matchDb);
    }
    async getRatio(matchId, teamId): Promise<number> {
        var m = await this.matchRepository.findOne(matchId);
        var bets = await this.betRepository.find();
        var matchTransactions = bets.filter((b) => b.matchId == m.id);
        var t1Total = 0;
        var matchTotal = 0;
        var t2Total = 0;

        matchTransactions.forEach((t) => {
            if (t.teamId == m.team1) {
                t1Total += t.amount;
            }
            if (t.teamId == m.team2) {
                t2Total += t.amount;
            }
            matchTotal += t.amount;
        });
        if (t1Total == 0 || t2Total == 0)
            return 0;
        if (teamId == m.team1) {
            return (matchTotal - t1Total) / t1Total;
        }
        if (teamId == m.team2) {
            return (matchTotal - t2Total) / t2Total;
        }
    }
}
