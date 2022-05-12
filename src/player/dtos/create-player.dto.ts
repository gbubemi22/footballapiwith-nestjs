/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class PlayerDTO {
  @IsNotEmpty()
  playername: string;
  @IsNotEmpty()
  position: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
  @IsNotEmpty()
  @IsBoolean()
  isCapatin: string;
  @IsNotEmpty()
  @IsMongoId()
  team: any;
}
