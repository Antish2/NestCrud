import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import dbconfig from './common/config/dbconfig';
import { PrismaService } from './common/config/prisma.service';
import { ConfigService } from '@nestjs/config';

//console.log(`${process.cwd()}/${process.env.NODE_ENV}.env`);
//console.log(dbconfig.name);
@Module({
  imports: [
     AuthModule,
     CityModule,
     ConfigModule.forRoot({
      isGlobal:true,
      load:[dbconfig],
      envFilePath:`.env.${process.env.NODE_ENV}`,
     }),
     UserModule
     
    ],
  controllers: [AppController],
  providers: [AppService,PrismaService,ConfigService],
})
export class AppModule {}
