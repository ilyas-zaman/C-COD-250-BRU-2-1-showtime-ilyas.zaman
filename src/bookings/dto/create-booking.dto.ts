import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateBookingDto {
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  eventId: MongooseSchema.Types.ObjectId;
}
