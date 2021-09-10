import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { AddUserDto, UserDto, UpdateUserDto } from '../models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(data: AddUserDto): Promise<UserDto> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user).then((value) => {
      return UserDto.from(value);
    });
  }

  findAll(limit: number, offset: number): Promise<[UserDto[], number]> {
    return this.userRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  findById(id: number): Promise<UserDto> {
    return this.userRepository.findOneOrFail(id).then((value) => {
      return UserDto.from(value);
    });
  }

  update(id: number, data: UpdateUserDto): Promise<UserDto> {
    return this.userRepository.update(id, data).then(() => {
      return this.findById(id);
    });
  }

  delete(id: number): Promise<any> {
    return this.userRepository.softDelete(id);
  }
}
