import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}
  async createEvent(createventdto: CreateEventDto) {
    const event = new this.eventModel(createventdto);
    await event.save();
    return { event };
  }
  async getEvents() {
    const events = await this.eventModel.find();
    return { events };
  }
  async getEventById(id: string) {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException('Could not find event.');
    }
    return { event };
  }
  async updateEvent(id: string, updateEventDto: UpdateEventDto) {
    const { event } = await this.getEventById(id);

    if (updateEventDto.name) {
      event.name = updateEventDto.name;
    }

    if (updateEventDto.date) {
      event.date = updateEventDto.date;
    }

    event.save();

    return { event };
  }
  async deleteEvent(id: string) {
    const { event } = await this.getEventById(id);

    await event.remove();

    //this.events = this.events.filter((_, x) => x !== id);
  }
}
