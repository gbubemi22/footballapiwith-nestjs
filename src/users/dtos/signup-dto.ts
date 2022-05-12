/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsIn,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../user.enum';
//import { Match } from "./match-decorator";

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phonenumber: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @ValidateIf((r) => typeof r.role !== 'undefined')
  @IsIn(Object.values(UserRole))
  role: UserRole;
}
