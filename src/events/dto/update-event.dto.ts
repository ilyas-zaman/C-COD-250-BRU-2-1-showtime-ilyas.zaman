import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  groupId: MongooseSchema.Types.ObjectId;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsOptional()
  @IsDateString({ strict: true } as any)
  date: Date;
}
