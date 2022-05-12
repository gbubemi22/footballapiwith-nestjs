/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { League } from 'src/league/schema/league.schema';

export type TeamDocument = Team & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Team {
  @Prop({
    required: [true, 'please provide a name'],
    unique: true,
    trim: true,
    maxlength: [15, 'Name can not be more than 15 characters'],
  })
  team: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    maxlength: [15, 'Name can not be more than 15 characters'],
  })
  nickname: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'League', index: true })
  league: League;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
