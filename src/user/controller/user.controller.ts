import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { AddUserDto, UserDto, UpdateUserDto } from '../models/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Body() newUser: AddUserDto): Promise<any> {
    return this.userService
      .create(newUser)
      .then((value) => {
        return {
          message: 'User successfully created',
          user: value,
        };
      })
      .catch((err) => {
        //23505 - unique_violation
        if (err.code === '23505') {
          throw new BadRequestException(
            'Account with this email already exists.',
          );
        }
        return err;
      });
  }

  @Get()
  async getAll(@Query() query): Promise<any> {
    const limit = Number.isInteger(Number(query.limit))
      ? Number(query.limit)
      : 20;
    const offset = Number.isInteger(Number(query.offset))
      ? Number(query.offset)
      : 0;
    return this.userService.findAll(limit, offset).then((value) => {
      return {
        total: value[1],
        data: value[0],
      };
    });
  }

  @Get(':id')
  async get(@Param() params): Promise<UserDto> {
    if (!(Number(params.id) > 0)) {
      throw new BadRequestException('ID must be an integer number');
    }

    return this.userService.findById(params.id).catch((err) => {
      throw new NotFoundException(`User with id ${params.id} not found!`);
    });
  }

  @Put(':id')
  async update(@Param() params, @Body() newData: UpdateUserDto): Promise<any> {
    if (!(Number(params.id) > 0)) {
      throw new BadRequestException('ID must be an integer number');
    }

    return this.userService
      .update(params.id, newData)
      .then((value) => {
        return {
          message: 'User successfuly updated',
          user: value,
        };
      })
      .catch(() => {
        throw new NotFoundException(`User with id ${params.id} not found!`);
      });
  }

  @Delete(':id')
  async deleteUser(@Param() params): Promise<any> {
    if (!(Number(params.id) > 0)) {
      throw new BadRequestException('ID must be an integer number');
    }

    return this.userService.delete(params.id).then((value) => {
      if (value.affected === 1) {
        return {
          message: 'User deleted successfuly!',
        };
      }
    });
  }
}
