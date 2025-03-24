import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  Password: string;

  @Prop()
  fullName: string;

  @Prop()
  age: number;

  @Prop()
  mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
