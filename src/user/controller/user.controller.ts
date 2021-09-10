import { Body, Controller, Post, Get, Query} from '@nestjs/common';
import { AddUserDto, UserDto } from '../models/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    
    constructor(private userService: UserService) {}
    
    @Post()
    async addUser(@Body() newUser: AddUserDto) : Promise<any> {
       return this.userService.create(newUser).then((value) => {
           return {
               message: 'User successfully created',
               user: value
           }
       });
    }

    @Get()
    async getAll(@Query() query) : Promise<any> {
        const limit = Number.isInteger(Number(query.limit)) ? Number(query.limit) : 20;
        const offset = Number.isInteger(Number(query.offset)) ? Number(query.offset) : 0;
        return this.userService.findAll(limit,offset).then((value) => {
            return {
                total: value[1],
                data: value[0]
            }
        });   
    }
}
