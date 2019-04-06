import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettorsModule } from './bettors/bettors.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [AuthModule, BettorsModule, TypeOrmModule.forRoot(), TeamModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
