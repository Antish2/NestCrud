import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';


//console.log(`${process.cwd()}/${process.env.NODE_ENV}.env`);
//console.log(dbconfig.name);
@Module({
  imports: [
     
     ConfigModule.forRoot({
      isGlobal:true,
      //load:[dbconfig],
      envFilePath:`.env.${process.env.NODE_ENV}`
     }),
     PrismaModule,
     AuthModule,
     CityModule,
     UserModule
    ],
  controllers: [AppController],
  providers: [AppService,PrismaService,ConfigService],
})
export class AppModule {}
