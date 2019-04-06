import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettorsModule } from './bettors/bettors.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';

@Module({
  imports: [AuthModule, BettorsModule, TypeOrmModule.forRoot(), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
