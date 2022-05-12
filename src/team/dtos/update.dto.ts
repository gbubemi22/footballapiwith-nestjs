/* eslint-disable prettier/prettier */
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  team: string;
  @IsOptional()
  nickname: string;
  @IsMongoId()
  @IsOptional()
  league: string;
}
