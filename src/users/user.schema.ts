import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  id: ObjectId;
  @Prop()
  email: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  readonly role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
