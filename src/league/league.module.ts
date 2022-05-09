/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { League, LeagueSchema } from './schema/league.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: League.name,
        useFactory: () => {
          const schema = LeagueSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-slug-generator'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
