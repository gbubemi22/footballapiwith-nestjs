/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Team } from 'src/team/schema/team.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Player {
  @Prop({
    required: true,
    unique: true,
    
    trim: true,
    maxlength: [25, 'Name can not be more than 25 characters'],
  })
  playername: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: [10, 'Name can not be more than 10 characters'],
  })
  position: string;

  @Prop({
    trim: true,
    unique: true,
    maxlength: [2, 'Number can not be more than 2 Figures'],
  })
  number: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  isCapatin: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team', index: true })
  team: Team;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
