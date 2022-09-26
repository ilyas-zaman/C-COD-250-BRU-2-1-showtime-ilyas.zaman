import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { Group, GroupSchema } from 'src/groups/group.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Transform(({ value }) => value.toString())
  id: ObjectId;
  @Prop({ type: GroupSchema })
  @Type(() => Group)
  group: Group['name'];
  @Prop()
  name: string;
  @Prop({
    enum: ['Pop', 'Rock', 'Rap', 'Rnb', 'Jazz', 'Funk', 'Electro', 'Jazz'],
  })
  genre: string;
  @Prop()
  date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
