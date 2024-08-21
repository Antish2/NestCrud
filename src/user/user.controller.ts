import { Controller,Get,Post,Body,Patch,Param,Delete,NotFoundException, HttpException, HttpCode, HttpStatus    } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserdto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { promises } from 'dns';
import { user } from './dto/user';
@Controller('user')
@ApiTags('users')
export class UserController {

    constructor(private readonly userservice:UserService){}

    @Post('/create')
    @ApiOkResponse({type:user,description:'User inserted successfully'})
    async create(@Body() createuserdto: CreateUserDto) : Promise<user> {
        return await this.userservice.create(createuserdto);
    }

    @Patch('/update/:id')
    @ApiOperation({ summary: 'Update User' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiOkResponse({type:user,description:'User updated successfully'})
    async update(@Param('id') id:string,@Body() updateuserdto:UpdateUserDto) {
       // console.log(id)
        return await this.userservice.update(id,updateuserdto);
    }

    @Get()
    @ApiOkResponse({type:user})
    async findAll() {
        return await this.userservice.findAll();
    }

    @Get(':id')
    @ApiOkResponse({description:'User fetched successfully'})
    async findone(@Param('id') id :string): Promise<user>
    {
        const result =await this.userservice.findOne(id)
        if (!result[0]) {
            throw new HttpException(`User with ${id} does not exist.`,HttpStatus.NOT_FOUND);
          }

          return result;
    }
    @Delete(':id')
    @ApiOkResponse()
    delete(@Param('id') id :string)
    {
        return this.userservice.delete(id);
    }

}
