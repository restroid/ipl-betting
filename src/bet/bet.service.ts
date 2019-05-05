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
            .query(`select -1*t.id id,       
            t.remark matchName,
                'fake' winner,
                0.0 winnerRatio,
                t.amount betAmount ,
                t.remark betOn,
            t.remark trans,t.amount , 'trans' ttype
                from transaction t where t.userId=` + userId + ` 
            union
                select b.id id, concat (t1.name,' vs ',t2.name) matchName ,
                IfNull(t3.name,'-') winner,
                ROUND(m.winnerRatio,2) winnerRatio,
                b.amount betAmount ,
                t.name betOn,
                concat('From Bet ',b.amount, ' on ' ,t.name,
                ' in ',t1.name,' vs ',t2.name,'=>Winner : ',IfNull(t3.name,'-'),
                '@',ROUND(m.winnerRatio,2)) trans,
                
                ROUND(b.amount *(
                     case when m.winnerTeamId!=0 and m.winnerRatio =0 then 0 
                     when m.winnerTeamId=b.teamId then (0.9*m.winnerRatio) 
                     else -1 end),2) 
                amount,
                'bet' ttype
                 from bet b  
                join \`match\` m on b.matchId=m.id
                join team t1 on t1.id=m.team1
                join team t2 on t2.id=m.team2          
                join team t on t.id=b.teamId
                left outer join team t3 on t3.id=m.winnerTeamId
            where b.userId=`+ userId
                + ' order by id desc'
            );
    }
    async matchesDetails(all : boolean): Promise<any[]> {
        var matches = await this.matchRepository.find();
        matches = matches.sort((a, b) => a.date.getTime() - b.date.getTime());
        if(!all)
        {
            var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            var now = new Date(indiaTime);
            now.setDate(now.getDate() - 1);//yesterday
            matches = matches.filter((m) => m.date > now).slice(0, 3);
        }
       
        var bets = await this.betRepository.find();
        var output = [];
        matches.forEach((m) => {
            var betSides = JSON.parse(m.Bets);
            var team1 = betSides[0];
            var team2 = betSides[1];
            var matchTransactions = bets.filter((b) => b.matchId == m.id);
            var t1Total = 0;
            var matchTotal = 0;
            var t2Total = 0;
            matchTransactions.forEach((t) => {
                if (t.BetOn == team1) {
                    t1Total += t.amount;
                }
                if (t.BetOn == team2.id) {
                    t2Total += t.amount;
                }
                matchTotal += t.amount;
            });

            output.push({
                id: m.id,
                description: m.Name,
                team1: {name:team1},
                team2: {name: team2},
                bets: betSides,
                venue: m.venue,
                date: m.date,
                team1Total: t1Total,
                team2Total: t2Total,
                matchTotal: matchTotal
            });
        })
        return output;
    }
    async matches(): Promise<any[]> {
        return await this.matchesDetails(false);
    }

    async matchesAdmin(): Promise<any[]> {
        return await this.matchesDetails(true);
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
