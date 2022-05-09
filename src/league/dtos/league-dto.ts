/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
//import { isString } from 'util';



export class LeagueDTO {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  leaguename: string;
  @IsNotEmpty()
  @IsOptional()
  location: string;
  @IsOptional()
  @IsString()
  logo: string;
}