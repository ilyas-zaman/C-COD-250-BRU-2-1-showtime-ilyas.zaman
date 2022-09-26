import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('signup')
  signUp(@Body(ValidationPipe) createuserDto: CreateUserDto) {
    return this.usersService.signUp(createuserDto);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.usersService.signIn(authCredentialsDto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@CurrentUser() user: UserDocument) {
    return this.usersService.getProfile(user);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updateAccount(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateAccount(user, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  deleteAccount(@CurrentUser() user: UserDocument) {
    return this.usersService.deleteAccount(user);
  }
}
