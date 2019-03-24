import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettorsModule } from './bettors/bettors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, BettorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
