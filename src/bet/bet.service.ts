import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from './bet.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/team.entity';
import { Match } from '../match/match.entity';

@Injectable()
export class BetService {
    constructor(
        @InjectRepository(Bet)
        private readonly betRepository: Repository<Bet>,
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>) { }

    async findForUser(userId: number): Promise<any[]> {
        return await this.betRepository
            .query(`select concat('t',t.id) id,t.remark trans,t.amount from transaction t where t.userId=` + userId + ` 
            union
                select concat('b',b.id) id,concat(t.name,' in ',t1.name,' vs ',t2.name) trans, b.amount *(case when m.winnerTeamId=b.teamId then (0.9*m.winnerRatio) else -1 end) amount
                from bet b  
                join \`match\` m on b.matchId=m.id
                join team t1 on t1.id=m.team1
                join team t2 on t2.id=m.team2
                join team t on t.id=b.teamId
            where b.userId=`+ userId);
    }
    async matches(): Promise<any[]> {
        var matches = await this.matchRepository.find();
        var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        var now = new Date(indiaTime);
        now.setDate(now.getDate() - 1);//yesterday
        matches = matches.filter((m) => m.date > now).slice(0, 3)
        var teams = await this.teamRepository.find();
        var bets = await this.betRepository.find();
        var output = [];
        matches.forEach((m) => {
            var team1 = teams.find((t) => t.id == m.team1);
            var team2 = teams.find((t) => t.id == m.team2);
            var matchTransactions = bets.filter((b) => b.matchId == m.id);
            var t1Total = 0;
            var matchTotal = 0;
            var t2Total = 0;
            matchTransactions.forEach((t) => {
                if (t.teamId == team1.id) {
                    t1Total += t.amount;
                }
                if (t.teamId == team2.id) {
                    t2Total += t.amount;
                }
                matchTotal += t.amount;
            });
            output.push({
                id: m.id,
                description: team1.name + " vs " + team2.name,
                team1: team1,
                team2: team2,
                team1Total: t1Total,
                team2Total: t2Total,
                matchTotal: matchTotal
            });
        })
        return output;
    }
    async add(bet: Bet): Promise<Bet> {
        bet.id = null;
        var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        var now = new Date(indiaTime);
        var match = await this.matchRepository.findOne({ id: bet.matchId });
        if (now > match.date) {
            throw new NotAcceptableException("Your time for betting is up!")
        }
        return await this.betRepository.save(bet);
    }
}
