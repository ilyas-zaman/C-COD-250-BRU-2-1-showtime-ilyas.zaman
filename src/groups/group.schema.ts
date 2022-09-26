import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Transform(({ value }) => value.toString())
  id: ObjectId;
  @Prop()
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
