import { IsString, IsInt } from "class-validator";
import { Bettor } from "../bettors.entity";



export class CreateBettorDto {
  ToDbModel(): Bettor {
    return new Bettor(name);
  }
    @IsString()
    readonly name: string;
    @IsInt()
    readonly validationCode: number;
  }