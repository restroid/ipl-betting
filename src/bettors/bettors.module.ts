import { Module } from '@nestjs/common';
import { BettorsController } from "./bettors.controller";
import { BettorsService } from "./bettors.service";
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [BettorsController],
    providers: [BettorsService],
  })
  export class BettorsModule { }
  