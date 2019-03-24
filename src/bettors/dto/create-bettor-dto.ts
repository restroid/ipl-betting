import { IsString, IsInt } from "class-validator";

export class CreateBettorDto {
    @IsString()
    readonly name: string;
    @IsInt()
    readonly validationCode: number;
  }