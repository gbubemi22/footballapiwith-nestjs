import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/users/dtos/login-dto';
import { SignUpDto } from 'src/users/dtos/signup-dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() signupDTO: SignUpDto) {
    return this.userService.register(signupDTO);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Body() loginDTO: LoginDto) {
    return await this.userService.login(loginDTO);
  }
}
