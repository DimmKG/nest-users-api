import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { UserEntity } from './user.entity';

export class AddUserDto {
  @IsNotEmpty()
  @Length(3, 256)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 256)
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/, {
    message:
      'password must be least eight characters, at least one letter and one number',
  })
  password: string;
}

export class UserDto {
  id: number;

  @IsNotEmpty()
  @Length(3, 256)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 256)
  email: string;

  createdAt: Date;

  deletedAt: Date;

  static from(entity: UserEntity): UserDto {
    const user = new UserDto();
    user.id = entity.id;
    user.name = entity.name;
    user.email = entity.email;
    user.createdAt = entity.createdAt;
    user.deletedAt = entity.deletedAt;
    return user;
  }
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(3, 256)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 256)
  email: string;
}
