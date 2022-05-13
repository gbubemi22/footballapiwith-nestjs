import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeagueModule } from './league/league.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync(process.env.MONGO_URI),

    LeagueModule,
    TeamModule,
    PlayerModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//   ],
//   providers: [UsersService, UsersRepository],
//   controllers: [UsersController],
// })
// export class UsersModule {}

// {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   bufferMaxEntries: 0,
//   bufferCommands: false,
// },
