import { Body, Controller, Post, HttpException, Get} from '@nestjs/common';
import { AddUserDto, UserDto } from '../models/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    
    constructor(private userService: UserService) {}
    
    @Post()
    addUser(@Body() newUser: AddUserDto) : Promise<any> {
       return this.userService.create(newUser).then((value) => {
           return {
               message: 'User successfully created',
               user: value
           }
       });
    }
}
