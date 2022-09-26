import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  groupId: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsDateString({ strict: true } as any)
  date: Date;
}
