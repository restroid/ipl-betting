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

    async balanceForUser(userId: number): Promise<any> {
        var amount = await this.betRepository
            .query(`Select ROUND(sum(amount),2) amount from
                    (select t.amount 
                    from transaction t where t.userId=` + userId + ` 
                union
                    select sum(b.amount *(
                         case when m.Winner is not null and m.winnerRatio =0 then 0 
                         when m.Winner=b.BetOn then (0.9*m.winnerRatio) 
                         else -1 end)) 
                    amount
                     from bet b  
                    join \`match\` m on b.matchId=m.id
                    join team t1 on t1.id=m.team1
                    join team t2 on t2.id=m.team2          
                    join team t on t.id=b.teamId
                    left outer join team t3 on t3.id=m.winnerTeamId
                where b.userId=`+ userId + ') c'
            );

        if (amount.length > 0) {
            return amount[0].amount;
        } else {
            return 0;
        }
    }

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
                select b.id id, m.Name matchName ,
                IfNull(m.Winner,'-') winner,
                ROUND(m.winnerRatio,2) winnerRatio,
                b.amount betAmount ,
                b.BetOn betOn,
                concat('From Bet ',b.amount, ' on ' ,b.BetOn,
                ' in ',m.Name,'=>Winner : ',IfNull(m.Winner,'-'),
                '@',ROUND(m.winnerRatio,2)) trans,
                
                ROUND(b.amount *(
                     case when m.Winner is not null and m.winnerRatio =0 then 0 
                     when m.Winner=b.BetOn then (0.9*m.winnerRatio) 
                     else -1 end),2) 
                amount,
                'bet' ttype
                 from bet b  
                join \`match\` m on b.matchId=m.id
            where b.userId=`+ userId
                + ' order by id desc'
            );
    }
    async matchesDetails(all: boolean): Promise<any[]> {
        var matches = await this.matchRepository.find();
        matches = matches.sort((a, b) => a.date.getTime() - b.date.getTime());
        if (!all) {
            var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            var now = new Date(indiaTime);
            now.setDate(now.getDate() - 2);//yesterday
            matches = matches.filter((m) => m.date > now).slice(0, 5).reverse();
        }

        var bets = await this.betRepository.find();
        var output = [];
        matches.forEach((m) => {
            var betSides = JSON.parse(m.Bets);
            var bets2 = betSides.map((b) => { return { name: b, amount: 0.0, ratio: 0.0 }; });
            var matchTransactions = bets.filter((b) => b.matchId == m.id);
            var matchTotal = 0;
            matchTransactions.forEach((t) => {
                matchTotal += t.amount;
                bets2.forEach((b) => {
                    if (t.BetOn == b.name) {
                        b.amount += t.amount;
                    }
                })
            });
            bets2.forEach((b) => {
                if (b.amount == 0 || matchTotal == b.amount) {
                    b.ratio = 0;
                } else {
                    b.ratio = ((matchTotal - b.amount) / b.amount).toFixed(2);
                }
            })

            output.push({
                id: m.id,
                description: m.Name,
                team1: bets2[0],
                team2: bets2[1],
                bets: bets2,
                venue: m.venue,
                Winner: m.Winner,
                date: m.date,
                team1Total: bets2[0].amount,
                team2Total: bets2[1].amount,
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
