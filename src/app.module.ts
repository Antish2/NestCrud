import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [AuthModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
