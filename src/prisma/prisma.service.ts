import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    // console.log(config.get<string>('DATABASE_URL'));
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL', { infer: true }),
          // url:config.get<string>('database.host',{infer:true})
        },
      },
    });
  }
  onModuleInit() {
    this.$connect();
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
