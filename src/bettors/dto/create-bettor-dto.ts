import { IsString, IsInt } from "class-validator";
import { Bettor } from "../bettors.entity";



export class CreateBettorDto {
  constructor() {
    this.name = 'unknown';
  }
  ToDbModel(): Bettor {
    return new Bettor(this.name);
  }
  @IsString()
  readonly name: string;
  @IsInt()
  readonly validationCode: number;
}