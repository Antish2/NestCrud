import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './common/config/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly config:ConfigService, private prisma :PrismaService) {}

  // @Get()
  // getHello(): string {
  //   return process.env.DATABASE_URL;
  // }

  @Get()
  getTest(): number{
    //const configService = app.get(ConfigService)
    return this.config.get<number>('port');
  }
}
