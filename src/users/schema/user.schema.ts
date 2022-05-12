/* eslint-disable prettier/prettier */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
//import * as validator from 'validator';
import { UserRole } from '../user.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
    @Prop({ type: String,
        required: [true, 'please provide a username'],
        maxlength: [9, 'should not be more than 9 character long'],
        minlength:[4, ' username should not be less than 4 '],
        trim: true,
        unique: true,})
    username: string;


    @Prop({ type: String,
        unique: true,
        required: [true, 'Please provide email'],
        
    })
    email: string;

    @Prop({type: Number,
        unique: true,
        require: [true, 'Please provide a number'],
        maxlength: [11, 'number should not be more than 11 digits'],
        minlength: [10, 'number should not be more less than 11'],
        trim: true,
    })
    phonenumber: number;


    @Prop({type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    })
    password: string;

    @Prop({type: String,
        enum: ['superAdmin','admin', 'user'],
        default: 'user',
    })
    role:UserRole

}

export const UserSchema = SchemaFactory.createForClass(User); 