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
  ParseIntPipe,
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
        throw err;
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
    const name = query.name;
    const res = this.userService.findAll(limit, offset, name);
    return res.then((value) => {
      return {
        total: value[1],
        data: value[0],
      };
    });
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findById(id).catch((err) => {
      throw new NotFoundException(`User with id ${id} not found!`);
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newData: UpdateUserDto,
  ): Promise<any> {
    return this.userService
      .update(id, newData)
      .then((value) => {
        return {
          message: 'User successfuly updated',
          user: value,
        };
      })
      .catch((err) => {
        if (err.code === '23505') {
          throw new BadRequestException(
            'Account with new email already exists.',
          );
        }
        throw new NotFoundException(`User with id ${id} not found!`);
      });
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.delete(id).then((value) => {
      if (value.affected === 1) {
        return {
          message: 'User deleted successfuly!',
        };
      }
    });
  }
}
