import { IsString, IsInt } from "class-validator";
import { Bettor } from "../bettors.entity";



export class CreateBettorDto {
  constructor() {
    this.name = 'unknown';
  }
  @IsString()
  readonly name: string;
  @IsInt()
  readonly validationCode: number;
}