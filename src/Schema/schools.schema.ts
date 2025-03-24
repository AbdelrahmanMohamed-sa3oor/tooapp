
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Teachers } from './teachers.schema';

export type schoolsDocument = HydratedDocument<schools>;

@Schema()
export class schools {
  @Prop()
  name: string;

  @Prop()
  locations: string;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teachers' }], default: [] })
  teachers: Teachers[];
}

export const schoolsSchema = SchemaFactory.createForClass(schools);
