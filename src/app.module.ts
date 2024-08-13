import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
     AuthModule,
     CityModule,
     ConfigModule.forRoot({
      envFilePath:'.env'
     })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
