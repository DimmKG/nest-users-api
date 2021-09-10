import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { AddUserDto, UserDto } from '../models/user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}
    
    create(data: AddUserDto) : Promise<UserDto> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user).then( (value) => {
            return UserDto.from(value);
        }).catch((err)=> {
            //23505 - unique_violation
            if (err.code === '23505') {
                throw new BadRequestException(
                  'Account with this email already exists.',
                );
              }
              return err;
        });
    }


}
