import { Injectable, OnModuleInit,OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy 
{
  onModuleInit() 
  {
     const config = new ConfigService();
     
     console.log(config.get<string>('DATABASE_URL'));
    // console.log('1--' + process.env.DATABASE_URL);
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL')
        },
      },
    })
   
    this.$connect();
  }
 onModuleDestroy()
 {
  this.$disconnect();
 }
  
}
