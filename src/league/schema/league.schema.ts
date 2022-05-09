/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//import * as mongoose from 'mongoose';


export type LeagueDocument = League & Document;
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class League {
  @Prop({required: true, unique: true, trim: true,
    maxlength: [18, 'Name can not be more than 18 characters']})
  leaguename: string;

  @Prop({required: true, unique: true, trim: true, 
    maxlength: [15, 'Name can not be more than 15 characters']})
  location: string;

  @Prop({required: false, unique: true})
  logo: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);