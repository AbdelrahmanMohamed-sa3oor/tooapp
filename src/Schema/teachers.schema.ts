
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeachersDocument = HydratedDocument<Teachers>;

@Schema()
export class Teachers {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  salary: number;
}

export const TeachersSchema = SchemaFactory.createForClass(Teachers);
