import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { EventsService } from './events.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/users/current-user.decorator';
import { CreateBookingDto } from 'src/bookings/dto/create-booking.dto';
import { UserDocument } from 'src/users/user.schema';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private bookingsService: BookingsService,
  ) {}
  @Post()
  createEvent(@Body(ValidationPipe) createventdto: CreateEventDto) {
    return this.eventsService.createEvent(createventdto);
  }
  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }

  @Put(':id')
  updateEvent(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEventdto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(id, updateEventdto);
  }
  @Post('/book/:id')
  @UseGuards(AuthGuard('jwt'))
  bookEvent(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(createBookingDto, user, id);
  }
}
