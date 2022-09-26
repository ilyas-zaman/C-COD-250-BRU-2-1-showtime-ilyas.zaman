import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @Length(8)
  password: string;

  @IsNotEmpty()
  role = 'user';
}
