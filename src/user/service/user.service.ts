import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { AddUserDto, UserDto, UpdateUserDto } from '../models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: AddUserDto): Promise<UserDto> {
    const user = this.userRepository.create(data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    user.password = hashedPassword;
    return this.userRepository.save(user).then((value) => {
      return UserDto.from(value);
    });
  }

  async findAll(
    limit: number,
    offset: number,
    name: string,
  ): Promise<[UserDto[], number]> {
    const qb = this.userRepository.createQueryBuilder().select();
    if (name) {
      const query = name.replace(/  +/g, ' & ');
      qb.where(`name @@ to_tsquery('${query}')`);
    }
    return qb.getManyAndCount().then((value) => {
      const arr = value[0].map((entity) => {
        return UserDto.from(entity);
      });
      return [arr, value[1]];
    });
  }

  async findById(id: number): Promise<UserDto> {
    return this.userRepository.findOneOrFail(id).then((value) => {
      return UserDto.from(value);
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserDto> {
    return this.userRepository.update(id, data).then(() => {
      return this.findById(id);
    });
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.softDelete(id);
  }
}
