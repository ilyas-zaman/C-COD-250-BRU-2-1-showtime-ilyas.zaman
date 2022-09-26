import { Group, GroupSchema } from './../groups/group.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { Type } from 'class-transformer';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop({ type: UserSchema })
  @Type(() => User)
  user: User['username'];
  @Prop({ type: GroupSchema })
  @Type(() => Group)
  group: Group['name'];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
