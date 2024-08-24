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
import databaseConfig from './common/config/database.config';
import { ThrottlerModule } from '@nestjs/throttler';

//console.log(`${process.cwd()}/${process.env.NODE_ENV}.env`);
//console.log(dbconfig.name);
console.log(`.env.${process.env.NODE_ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      // load:[databaseConfig]
    }),
    ThrottlerModule.forRoot([{
      ttl:1000,
      limit:3
    }]),
    PrismaModule,
    AuthModule,
    CityModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}
