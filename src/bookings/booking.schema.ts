import { UserSchema } from './../users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';
import { Type } from 'class-transformer';
import { EventSchema } from 'src/events/event.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: UserSchema })
  @Type(() => User)
  user: User['username'];
  @Prop({ type: EventSchema })
  @Type(() => Event)
  event: Event;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
