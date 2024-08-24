import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserdto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { promises } from 'dns';
import { user } from './dto/user';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create User' })
  //@UsePipes(new ValidationPipe({whitelist:true}))
  @ApiCreatedResponse({ type: user, description: 'User inserted successfully' })
  async create(@Body() createuserdto: CreateUserDto): Promise<user> {
    return await this.userservice.create(createuserdto);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOkResponse({ type: user, description: 'User updated successfully' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateuserdto: UpdateUserDto,
  ) {
    // console.log(id)
    return await this.userservice.update(id, updateuserdto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All User' })
  @ApiOkResponse({ type: user })
  async findAll() {
    return await this.userservice.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User By id' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @ApiNotFoundResponse({ description: 'Not found' })
  async findone(@Param('id', ParseUUIDPipe) id: string): Promise<user> {
    let result;
    // try {
    //console.log('try');
    //console.log(`1`);
    result = await this.userservice.findOne(id);
    //console.log(`2`);
    //console.log(result);
    if (!result[0]) {
      // console.log(`3`);
      // console.log(result);
      throw new HttpException(
        `User with ${id} does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    }
    // else {
    //   //console.log(`4`);
    //   throw new HttpException(
    //     `User with ${id} does not exist.`,
    //     HttpStatus.CONFLICT,
    //   );
    // }
    // }
    // catch (error) {
    //     console.log(`5`);
    //     //throw new HttpException(`User with ${id} does not exist.`, HttpStatus.NOT_FOUND);
    // }

    return result;
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse()
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userservice.delete(id);
  }
}
