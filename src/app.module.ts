import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { BetModule } from './bet/bet.module';
import { TransactionModule } from './transaction/transaction.module';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(), TeamModule, MatchModule, BetModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService,RolesGuard],
})
export class AppModule { }
