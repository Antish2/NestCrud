import { Controller,Get,Post,Body,Patch,Param,Delete,ParseIntPipe    } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/CreateAuthDto';
import { UpdateAuthDto } from './dto/UpdateAuthDto';

import { promises } from 'dns';



@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService){}

    @Post('/create')
    @ApiOkResponse({description:'User inserted successfully'})
    create(@Body() createauthdto: CreateAuthDto) {
        return this.authservice.create(createauthdto);
    }

    @Patch('/update')
    update(@Body() updateauthdto: UpdateAuthDto) {
        return '';
    }

    @Get()
    @ApiOkResponse()
    findAll() {
        return this.authservice.findAll();
    }

    @Get(':id')
    @ApiOkResponse({description:'User fetched successfully'})
    findone(@Param('id') id :string)
    {
        return this.authservice.findOne(id);
    }
    @Delete(':id')
    @ApiOkResponse()
    delete(@Param('id') id :string)
    {
        return this.authservice.delete(id);
    }
}
