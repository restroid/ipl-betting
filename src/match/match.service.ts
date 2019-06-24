import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Bet } from '../bet/bet.entity';

@Injectable()
export class MatchService {
    public static currentSeries: any = "WC19";
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>) { }

    async findAll(): Promise<Match[]> {
        return await this.matchRepository.find({ SeriesName: MatchService.currentSeries });
    }

    async add(match: Match): Promise<Match> {
        match.id = null;
        match.winnerRatio = 0;
        match.Winner = "";
        match.SeriesName = MatchService.currentSeries;
        return await this.matchRepository.save(match);
    }
    async setWinner(match: Match): Promise<Match> {
        //todo: set match ratio
        var matchDb = await this.matchRepository.findOne(match.id);
        matchDb.Winner = match.Winner
        matchDb.winnerRatio = await this.getRatio(match.id, match.Winner);

        return await this.matchRepository.save(matchDb);
    }
    async getRatio(matchId, teamName): Promise<number> {
        var m = await this.matchRepository.findOne(matchId);
        var bets = await this.betRepository.find();
        var matchTransactions = bets.filter((b) => b.matchId == m.id);
        var teamTotal = 0;
        var matchTotal = 0;
        matchTransactions.forEach((t) => {
            matchTotal += t.amount;
            if (t.BetOn == teamName)
                teamTotal += t.amount;
        });
        if (teamTotal == 0 || teamTotal == matchTotal)
            return 0;
        return (matchTotal - teamTotal) / teamTotal;
    }
}
