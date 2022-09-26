import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  findOneByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  createAuthentificationToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async signUp(createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.findOneByEmail(createUserDto.email);
    const userFoundByUsername = await this.findOneByUsername(
      createUserDto.username,
    );

    if (userFoundByEmail) {
      throw new ConflictException('An user with that mail already exists');
    } else if (userFoundByUsername) {
      throw new ConflictException('An user with that username already exists');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.role = 'user';
    const user = new this.userModel(createUserDto);
    await user.save();

    return { message: 'User is registered !' };
  }
  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const userFoundByUsername = await this.findOneByUsername(
      authCredentialsDto.username,
    );
    if (!userFoundByUsername) {
      throw new UnauthorizedException(' Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      authCredentialsDto.password,
      userFoundByUsername.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException(' Invalid credentials');
    }
    const token = this.createAuthentificationToken(userFoundByUsername._id);
    return { message: 'User is signed in !', token };
  }
  getProfile(user: UserDocument) {
    user.password = undefined;

    return { profile: user };
  }
  async updateAccount(user: UserDocument, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const userFoundByEmail = await this.findOneByEmail(updateUserDto.email);
      if (userFoundByEmail) {
        throw new ConflictException('An user with that mail already exists');
      }
      user.email = updateUserDto.email;
    } else if (updateUserDto.username) {
      const userFoundByUsername = await this.findOneByUsername(
        updateUserDto.username,
      );
      if (userFoundByUsername) {
        throw new ConflictException(
          'An user with that username already exists',
        );
      }
      user.username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.userModel.findByIdAndUpdate(user, updateUserDto).exec();

    user.password = undefined;
    return { profile: user, message: 'Account successfully updated !' };
  }
  async deleteAccount(user: UserDocument) {
    try {
      await this.userModel.findByIdAndUpdate(user);
    } catch (error) {
      throw new InternalServerErrorException('Cannot delete account');
    }
    return { message: 'Account successfully deleted !' };
  }
}
