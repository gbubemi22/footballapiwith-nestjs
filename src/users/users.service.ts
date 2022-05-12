import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignUpDto } from './dtos/signup-dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dtos/user-dto';
import { LoginDto } from './dtos/login-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(signupDTO: SignUpDto): Promise<User> {
    const user = new this.userModel();
    user.email = signupDTO.email;
    user.password = await bcrypt.hash(signupDTO.password, 20);
    return user.save();
  }

  async login(loginDTO: LoginDto): Promise<UserDto> {
    const username: User = await this.userModel
      .findOne({ username: loginDTO.username })
      .select('+password')
      .exec();
    if (!username) {
      throw new HttpException('Username not found', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      username.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const userDTO = new UserDto();
    const token = this._createToken(loginDTO);
    userDTO.username = username.username;
    userDTO.token = token;
    return userDTO;
  }

  async findOne(username: string): Promise<User> {
    const user: User = await this.userModel.findOne({ email: username }).exec();
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: LoginDto): any {
    const user: any = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiration: '1hr',
      accessToken,
    };
  }
}
