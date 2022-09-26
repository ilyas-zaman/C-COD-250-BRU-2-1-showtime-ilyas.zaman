import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateFavoriteDto {
  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  groupId: MongooseSchema.Types.ObjectId;
}
