import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  createBooking(
    createbookingDto: CreateBookingDto,
    user: UserDocument,
    eventId: string,
  ) {
    const createdBooking = new this.bookingModel({
      ...createbookingDto,
      eventId,
      user,
    });
    return createdBooking.save();
  }
}
