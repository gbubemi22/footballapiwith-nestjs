/* eslint-disable prettier/prettier */
import { IsBoolean, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateplayerDto {
  @IsOptional()
  playername: string;


  @IsOptional()
  position: string;

  @IsOptional()
  @IsNumber()
  number: number;

  @IsOptional()
  @IsBoolean()
  isCapatin: boolean;

  @IsMongoId()
  @IsOptional()
  team: string;
}
