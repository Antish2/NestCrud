import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/CreateAuthDto';
import { UpdateAuthDto } from './dto/UpdateAuthDto';

import { promises } from 'dns';
import { user } from 'src/user/dto/user';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './strategy/local.auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() createauthdto: CreateAuthDto) {
    let token = this.authservice.login(
      createauthdto.name,
      createauthdto.password,
    );
    //console.log(tkn);
    return await token;
  }
}
