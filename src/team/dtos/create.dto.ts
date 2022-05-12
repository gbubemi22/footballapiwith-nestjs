/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateTeamDTO {
  @IsNotEmpty()
  team: string;
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  @IsMongoId()
  league: any;
}
